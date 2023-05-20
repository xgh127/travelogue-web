import React, {useEffect, useState} from 'react';
import {
    Layout,
    Menu,
    Tabs
} from 'antd';
import {useNavigate} from "react-router-dom";
import {doGet} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import DataChart from "./DataChart";


const { Sider,Content } = Layout;

const ManageData = () => {
    const navigate = useNavigate();
    const [userlike,setUserlike] = useState([])
    const [usercomment, setUsercomment] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
            try {
                //  /Travelogue?Travelogue.Status=3
                const likesResp = await doGet('/Like');
                const likeRespJson = resp2Json(likesResp).data;
                //统计每个用户的点赞数
                const userLike = {};
                likeRespJson.forEach((like) => {
                    if (userLike[like.UserId]) {
                        userLike[like.UserId] += 1;
                    } else {
                        userLike[like.UserId] = 1;
                    }
                });
                //统计每个用户的评论数
                const CommentResp = await doGet('/Comment');
                const CommentRespJson = resp2Json(CommentResp).data;
                const userComment ={};
                CommentRespJson.forEach((comment)=>{
                    if (userComment[comment.ParentId]){
                        userComment[comment.ParentId] += 1;
                    } else {
                        userComment[comment.ParentId] = 1;
                    }
                });
                //获取所有用户信息
                const usersResp = await doGet('/User');
                const usersRespJson = resp2Json(usersResp).data;
                //将用户名和点赞数对应起来
                const userLikeList = [];
                usersRespJson.forEach((user) => {
                    if (userLike[user.id]) {
                        userLikeList.push({
                            key: user.id,
                            username: user.UserName,
                            like: userLike[user.id],
                        });
                    }
                });
                //将用户名和评论数对应起来
                const userCommentList = [];
                usersRespJson.forEach((user)=> {
                    if (userComment[user.id]){
                        userCommentList.push({
                            key: user.id,
                            username: user.UserName,
                            comment: userComment[user.id],
                        });
                    }
                });
                // console.log(JSON.stringify(userLikeList));
                setUserlike(userLikeList);
                setUsercomment(userCommentList);
                // alert("获取数据成功"+JSON.stringify(userLikeList))
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };

        fetchData();
    },[])

    const navigationLinks = [
        {
            title: '人员角色管理',
            path: '/manager'
        },
        {
            title: '游记汇总',
            path: '/managernotesall'
        },
        {
            title: '数据统计',
            path: '/AdminData'
        }
    ];


    return(
        <Layout hasSider>
            <Sider className="sidebar">
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline">
                    {navigationLinks.map((link)=>(
                        <Menu.Item key={link.path}  onClick={()=>{navigate(link.path)}}>{link.title}</Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <div className="content">
                <Content >
                    <div
                        style={{
                            padding: 100,
                        }}
                    >
                        <Tabs >
                            <Tabs.Item  style={{width:500}} tab="用户点赞数统计" key="1">
                                <DataChart title = '用户获取点赞数量表' x = 'username' y='like' data = {userlike}/>
                            </Tabs.Item>
                            <Tabs.Item  style={{width:500}} tab="用户评论数统计" key="2">
                                <DataChart title = '用户评论数量表' x = 'username' y='comment' data = {usercomment}/>
                            </Tabs.Item>
                            <Tabs.Item   tab="其他" key="3">
                           <p>other chart</p>
                            </Tabs.Item>
                        </Tabs>


                    </div>
                </Content>
            </div>
        </Layout>
    );
};
export default ManageData;

