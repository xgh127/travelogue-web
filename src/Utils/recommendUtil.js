import {doGet, doRecommentGet, ip} from "./ajax";
import {resp2Json} from "./Tool";

//如果有人对这里是什么感兴趣的话，这是我自己创建的项目做的推荐算法的测试，需要有点赞表，但是还没排除用户已经浏览过的游记
//参考网址：https://blog.csdn.net/qq_26274961/article/details/117881061，实现的是其中基于物品的协同过滤算法（Item-Based）
const recommendUrl='http://202.120.40.86:14642/rmp-resource-service/project/646592a36da1a40015f121d8/resource'
/**
 * 基于物品的协同过滤算法,传入目标用户的id，返回推荐的游记id
 * @param targetUserId
 * @returns {Promise<[]>}
 * @constructor
 */
export const ItemBased_Collaborative_Filtering=async (targetUserId) => {
    //获取用户点赞数据
    let Likes = await doRecommentGet(ip + '/Like');
    console.log("likes" + JSON.stringify(Likes.data));
    let likes = Likes.data;
    //为了防止TravelId不连续，构建一个TravelId的映射，将TravelId映射为连续的数字
    let travelIdMap = new Map();
    let travelId = 1;
    for (let like of likes) {
        if (!travelIdMap.has(like.TravelId)) {
            travelIdMap.set(like.TravelId, travelId++)
        }
    }
    //为了防止UserId不连续，构建一个UserId的映射，将UserId映射为连续的数字
    let userIdMap = new Map();
    let userId = 1;
    for (let like of likes) {
        if (!userIdMap.has(like.UserId)) {
            userIdMap.set(like.UserId, userId++)
        }
    }
    //将映射结果console出来
    console.log("travelIdMap")
    for (let [key, value] of travelIdMap) {
        console.log("key=" + key + " value=" + value)
    }
    console.log("userIdMap")
    for (let [key, value] of userIdMap) {
        console.log("key=" + key + " value=" + value)
    }
    //构建userId—>TravelId的倒排
    let userTravelMap = new Map();
    for (let like of likes) {
        let mappedUserId = userIdMap.get(like.UserId);
        let mappedTravelId = travelIdMap.get(like.TravelId);
        if (!userTravelMap.has(mappedUserId)) {
            userTravelMap.set(mappedUserId, [])
        }
        userTravelMap.get(mappedUserId).push(mappedTravelId);
    }
    //将倒排结果console出来
    for (let [key, value] of userTravelMap) {
        console.log(key + " " + value)
    }
    //构建TravelId->userId的倒排
    let travelUserMap = new Map();
    for (let like of likes) {
        let mappedUserId = userIdMap.get(like.UserId);
        let mappedTravelId = travelIdMap.get(like.TravelId);
        if (!travelUserMap.has(mappedTravelId)) {
            travelUserMap.set(mappedTravelId, [])
        }
        travelUserMap.get(mappedTravelId).push(mappedUserId);
    }
    //定义二阶矩阵，保存共现矩阵
    let coMatrix = [];
    //通过userTravelMap构建TravelId与Travelled的共现矩阵,这个矩阵是对称的，x行y列代表同时喜欢两ravelId x 和TravelId y的人数，如下所示
    // 商品	a	b	c	d	e
    // a	0	1	0	2	0
    // b	1	0	2	2	1
    // c	0	2	0	2	1
    // d	2	2	2	0	0
    // e	0	1	1	0	0
    // 例如，a和b同时被1个人喜欢，a和d同时被2个人喜欢
    for (let [key, value] of userTravelMap) {
        for (let i = 0; i < value.length; i++) {
            if (!coMatrix[value[i]]) {
                coMatrix[value[i]] = [];
            }
            for (let j = 0; j < value.length; j++) {
                if (i !== j) {
                    if (!coMatrix[value[i]][value[j]]) {
                        coMatrix[value[i]][value[j]] = 1;
                    } else {
                        coMatrix[value[i]][value[j]]++;
                    }
                }
            }
        }
    }
    //将共现矩阵console出来
    console.log("共现矩阵"+coMatrix.length)
    for (let i = 1; i < coMatrix.length; i++) {
        for (let j = 1; j < coMatrix.length; j++) {
            if (coMatrix[i][j]) {
                console.log("("+i + "," + j + ") => " + coMatrix[i][j])
            }
        }
    }
    //计算Travelogue之间的相似度
    let simMatrix = [];
    for (let i = 1; i < coMatrix.length; i++) {
        if (!simMatrix[i]) {
            simMatrix[i] = [];
        }
        for (let j = 1; j < coMatrix.length; j++) {
            if (i !== j) {
                if (!simMatrix[i][j]) {
                    //用余弦相似度计算，结果保留两位小数
                    simMatrix[i][j] =parseFloat( (coMatrix[i][j]*100 / Math.sqrt(travelUserMap.get(i).length * travelUserMap.get(j).length)).toFixed(2));
                }
            }
        }
    }
    //simMatrix其余地方设置为0
    for (let i = 1; i < simMatrix.length; i++) {
        for (let j = 1; j < simMatrix.length; j++) {
            if (!simMatrix[i][j]) {
                simMatrix[i][j] = 0;
            }
        }
    }
    //将相似度矩阵console出来
    console.log("相似度矩阵"+simMatrix[1][2]);
    for (let i = 1; i < simMatrix.length; i++) {
        for (let j = 1; j < simMatrix.length; j++) {
            if (simMatrix[i][j]) {
                console.log("("+i + "," + j + ") => " + parseFloat(simMatrix[i][j]).toFixed(2))
            }
        }
    }
    //构建userId对对应的评分向量，即userId对于某个TravelId有点赞则为1，否则为0
    let userScoreMap = new Map();
    for (let like of likes) {
        let mappedUserId = userIdMap.get(like.UserId);
        let mappedTravelId = travelIdMap.get(like.TravelId);
        if (!userScoreMap.has(mappedUserId) ){
            userScoreMap.set(mappedUserId, [])
        }
        userScoreMap.get(mappedUserId)[mappedTravelId] = 1;
    }
    //其余用0填充
    for (let [key, value] of userScoreMap) {
        for (let i = 1; i < coMatrix.length; i++) {
            if (!value[i]) {
                value[i] = 0;
            }
        }
    }
    //将评分向量console出来
    console.log("评分向量:")
    for (let [key, value] of userScoreMap) {
        console.log(key + " " + value)
    }
    //计算targetUserId的推荐TravelId
    let mUserID = userIdMap.get(targetUserId);
    let recommendVector = userScoreMap.get(mUserID);
    console.log("targetUserId="+targetUserId+" mUserID="+mUserID);
    console.log("targetUserId的评分向量:" + recommendVector);
    //除开targetUserId已经点赞的TravelId
    let recommendTravelIds = [];
    //获取targetUserId已经点赞的TravelId
    let likedTravelIds = userTravelMap.get(mUserID);
    console.log("已经点赞的TravelId:" + likedTravelIds)
    //计算simMatrix中除了likedTravelIds之外其它行向量与recommendVector的内积
    for (let i = 1; i < simMatrix.length; i++) {
        if (likedTravelIds.indexOf(i) === -1) {
            let sum = 0;
            for (let j = 0; j < recommendVector.length; j++) {

                if (simMatrix[i][j] === undefined) {
                    simMatrix[i][j] = 0;
                }
                if (recommendVector[j] === undefined) {
                    recommendVector[j] = 0;
                }
                sum += recommendVector[j] * simMatrix[i][j];
            }
            recommendTravelIds.push({TravelId: i, score: sum});
        }
    }
    //按照内积从大到小排序
    recommendTravelIds.sort(function (a, b) {
        return b.score - a.score;
    })
    console.log("推荐结果:")
    for (let i = 0; i < recommendTravelIds.length; i++) {
        console.log(recommendTravelIds[i].TravelId + " " + recommendTravelIds[i].score)
    }
    //将recommendTravelIds中的TravelId反向映射回去，即通过value找到key
    //存放反向映射后的travelId和score
    let ans = new Map();
    for (let i = 0; i < recommendTravelIds.length; i++) {
        for (let [key, value] of travelIdMap) {
            if (value === recommendTravelIds[i].TravelId) {

                ans[i] = {key: key, value: recommendTravelIds[i].score};
            }
        }
    }
    //s输出反向映射后的结果
    console.log("反向映射后的推荐结果:")
    for (let i = 0; i < recommendTravelIds.length; i++) {
        console.log(ans[i].key + " " + ans[i].value);
    }
    let ids = [];
    for (let i = 0; i < recommendTravelIds.length; i++) {
        ids.push(ans[i].key);
    }

    return ids;
}
/**
 * 根据浏览次数推荐
 * @constructor
 */
export const ViewsRecommend = async (N) => {
    let data = await doGet('/History');
    let historyInfo = resp2Json(data).data;

    let travelViews = new Map();
    for (let history of historyInfo) {
        if (!travelViews.has(history.TravelId)) {
            travelViews.set(history.TravelId, 1);
        } else {
            travelViews.set(history.TravelId, travelViews.get(history.TravelId) + 1);
        }
    }

    let travelViewsArr = [];
    for (let [key, value] of travelViews) {
        travelViewsArr.push({ TravelId: key, views: value });
    }
    //输出
    console.log("浏览次数:");
    for (let i = 0; i < travelViewsArr.length; i++) {
        console.log(travelViewsArr[i].TravelId + " " + travelViewsArr[i].views);
    }

    let ids = [];
    for (let i = 0; i < Math.min(N, travelViewsArr.length); i++) {
        ids.push(travelViewsArr[i].TravelId);
    }
    //输出ids
    console.log("推荐结果:");
    for (let i = 0; i < ids.length; i++) {
        console.log(ids[i]);
    }
    return ids;
}
