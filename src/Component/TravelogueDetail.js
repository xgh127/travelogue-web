import React, {useEffect, useState} from 'react';
import {Card, Typography, Avatar, Tag, Form, Button, message, Tooltip} from 'antd';
import {Comment} from "@ant-design/compatible";
import "../CSS/TravelogueDetail.css";
import {EyeOutline, HeartOutline} from "antd-mobile-icons";
import TextArea from "antd/es/input/TextArea";
import {doGet, doJSONPost, doJSONPut} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import {HeartFilled, HeartOutlined, SmileOutlined} from "@ant-design/icons";
import {Constant} from "../Utils/constant";
import {getLocalUser, getUserByUserId} from "../Service/UserService";
const { Paragraph } = Typography;

const TravelogueDetails = () => {
    const travelogueInfoInitial = {
        Author:{Avatar: 'src/Assets/InitalAvatar.jpg'},
        Title: '西湖游记',
        views: 100,
        likes: 50,
        PublishTime: '2023-5-16',
        Tag: ['自然风光', '春天'],
    };
    //定义游记信息Hook
    const  [travelogueInfo,setTravelogueInfo] = useState(travelogueInfoInitial);
    const [isLiked, setIsLiked] = useState(false);
    const [likeNum, setLikeNum] = useState(0);
    const [viewNum, setViewNum] = useState(0);

    const handleLike = async () => {
        if (isLiked) {
           message.info('你已经点过赞啦！');
                return;
        }
        try {
            let likeinfo = {
                TravelId: travelogueInfo.id,
                UserId: parseInt(localStorage.getItem(Constant.USERID))
            };
            // 向后端发送POST请求来更新like表
            const likeresponse = await doJSONPost('/Like',likeinfo);
            let likerespJson = resp2Json(likeresponse);
            // alert("likerespJson:"+JSON.stringify(likerespJson));
            let likeInfo1 = likerespJson.data;
            // 更新游记信息，将点赞信息添加到游记信息中
            // travelogueInfo.PublishTime = JSON.stringify(new Date());
            travelogueInfo.Likes.push(likeInfo1);
            let res = await doJSONPut('/Travelogue/' + travelogueInfo.id, travelogueInfo);
            // alert("resToPut:"+JSON.stringify(res));

            if (res.code === 0) {
                 setIsLiked(true);
                // 更新点赞数
                setLikeNum(likeNum + 1);
            }
        } catch (error) {
            console.error('Failed to like travelogue:', error);
        }
    };

    //渲染组件时获取信息
    useEffect(() => {
       //从url获取参数id，url为 url+？id=xxx
        const id = window.location.search.split('=')[1];
        console.log("id:"+id);
        const fetchData = async () => {

            try {
                //进入这个页面就要post 一个History到后端
                let historyInfo = {
                    TravelId: parseInt(id),
                    UserId: parseInt(localStorage.getItem(Constant.USERID)),
                    Time: JSON.stringify(new Date())
                };
                // alert("historyInfo:"+JSON.stringify(historyInfo));
                // 向后端发送POST请求来更新history表
                const historyresp = await doJSONPost('/History',historyInfo);
                // alert("historyresp:"+JSON.stringify(historyresp));
                //根据id获取游记信息
                const notesInfo = await doGet('/Travelogue/'+id);
                console.log("notesInfo111111111" + JSON.stringify(notesInfo));
                const resp = resp2Json(notesInfo);
                console.log("noteDetailInfo" + JSON.stringify(resp.data));
                // alert("noteDetailInfo" + JSON.stringify(resp.data));
                setTravelogueInfo(resp.data);
                const likeInfo = resp.data.Likes;
                //检查用户是否已经对该游记点赞，并设置点赞状态
                for (let i = 0; i < likeInfo.length; i++) {
                    if (likeInfo[i].UserId === parseInt(localStorage.getItem(Constant.USERID))) {
                        setIsLiked(true);
                        break;
                    }
                }
                //设置点赞数
                setLikeNum(likeInfo.length);

                //根据id获取浏览量信息
                const viewsInfo = await doGet('/History/?History.TravelId='+id);
                //提取viewsInfo中的浏览量
                setViewNum(resp2Json(viewsInfo).data.length);
                //读取评论信息
                const commentsInfo = resp.data.Commments;
                // alert("commentsInfo:"+JSON.stringify(commentsInfo));
                for (let i = 0; i < commentsInfo.length; i++) {
                    //根据评论信息中的用户id获取用户信息
                    let userId = commentsInfo[i].ParentId;
                    const user = await getUserByUserId(userId);
                    //将用户信息添加到评论信息中
                    // alert("user:" + JSON.stringify(user));
                    commentsInfo[i].Author = user.Nickname
                    commentsInfo[i].Avatar = user.Avatar;
                }
                // alert("commentsInfo:"+JSON.stringify(commentsInfo));
                setComments(commentsInfo);
            } catch (error) {
                console.error("Failed to fetch note:", error);
            }
        };

        fetchData();
        //根据id获取游记信息
    }, []);
    // 游记内容
// 评论列表
    const [comments, setComments] = useState([
        {  Author: '陈昱', Content: '真让人心驰神往',Avatar:'src/Assets/InitalAvatar.jpg',PublishTime:'2021-5-16' },
        {  Author: '严寒', Content: '那真是太酷啦！！！！！！！' ,Avatar:  'src/Assets/InitalAvatar.jpg',PublishTime: '2021-5-16'},
    ]);
    const LikeButton = () => {
        if (isLiked) {
            return <HeartFilled style={{ color: 'red' }} onClick={handleLike} />;
        } else {
            return <HeartOutlined onClick={handleLike} />;
        }
    };

    const handleAddComment = async (values) => {
        const newComment = {
            Content: values.comment,
            CommentTime: JSON.stringify(new Date()),
            ParentId: parseInt(localStorage.getItem(Constant.USERID)),
        };
        console.log("newComment:" + JSON.stringify(newComment));
        // 向后端发送POST请求来更新comment表
        const commentresp = await doJSONPost('/Comment', newComment);
        const commentrespJson = resp2Json(commentresp);
        console.log("commentrespJson:" + JSON.stringify(commentrespJson));
        if (commentrespJson.code === 0) {
            message.success('评论成功！');
            //更新游记信息，将评论信息添加到游记信息中

            // 创建新的评论数组副本
            let newC = commentrespJson.data;
            newC.Author = getLocalUser().Nickname;
            newC.Avatar = getLocalUser().Avatar;
            const newComments = [...comments,newC ];
            // 更新状态，使用新的评论数组副本
            setComments(newComments);
            travelogueInfo.Commments.push(commentrespJson.data);
            comments.push(commentrespJson.data);
            await doJSONPut('/Travelogue/' + travelogueInfo.id, travelogueInfo);
//为了防止setComments异步的
        } else {
            message.error('评论失败！');
        }

    };
    return (
        <div className='travelogue-details-container'>
            {/* 游记信息展示条 */}
            <Card>
                <div className="travelogue-info">
                    <div className="avatar-title">
                        <Avatar src={travelogueInfo.Author.Avatar?"src/Assets/InitalAvatar.jpg" :travelogueInfo.Author.Avatar} alt="用户头像" />
                        <h2 style={{fontSize:24}}>{travelogueInfo.Title}</h2>
                    </div>
                    <div className="stats">

                        <span>发布时间：{
                            //如果时间为空，则显示默认时间
                            travelogueInfo.PublishTime?travelogueInfo.PublishTime:'2021-01-01'
                        }</span>
                        <span>
              标签：
                            {travelogueInfo.Tag.map(tag => (
                                <Tag  color={"geekblue"}>{tag.Name}</Tag>
                            ))}
            </span>
                    </div>
                </div>
            </Card>

            {/* 游记内容展示 */}
            <Card>
                <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: '展开' }}>
                    <div style={{fontSize:20,textAlign:'left'}} dangerouslySetInnerHTML={{ __html: travelogueInfo.Content }} />
                </Paragraph>
            </Card>
            <div className='stats'>
                <div>
                    <EyeOutline style={{ marginRight: 5 }}/>
                    <span>浏览量：{viewNum}</span>
                </div>
                <div>
                    {/*增加爱心图标*/}
                    <HeartOutline style={{ marginRight: 5 }}/>
                    <span>点赞量：{likeNum}</span>
                    <LikeButton/>

                </div>
            </div>
            {/* 评论区 */}
            <Card>
                <div className="comments-section">
                    <h3>评论区</h3>
                    {/* 添加评论的输入框 */}
                    <Form onFinish={handleAddComment}>
                        <Tooltip title="评论仅支持英文">
                        <Form.Item name="comment">

                            <TextArea rows={4} placeholder="善言结善缘，恶语伤人心！" />

                        </Form.Item>
                        </Tooltip>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                        </Form.Item>
                    </Form>
                    {comments.map(comment => (
                        <Comment
                            avatar={<Avatar src={comment.Avatar} alt={comment.Author} />}
                            author={comment.Author}
                            content={comment.Content}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default TravelogueDetails;
