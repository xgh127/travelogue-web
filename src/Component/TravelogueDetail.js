import React, {useEffect, useState} from 'react';
import {Card, Typography, Avatar, Tag, Form, Button, message} from 'antd';
import {Comment} from "@ant-design/compatible";
import "../CSS/TravelogueDetail.css";
import {EyeOutline, HeartOutline} from "antd-mobile-icons";
import TextArea from "antd/es/input/TextArea";
import {doGet, doJSONPost} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import {HeartFilled, HeartOutlined} from "@ant-design/icons";
import {Constant} from "../Utils/constant";
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

    const handleLike = async () => {
        if (isLiked) {
            message.info('您已经点过赞啦！');
            return;
        }
        try {
            let likeinfo = {
                TravelId: travelogueInfo.id,
                UserId: parseInt(localStorage.getItem(Constant.USERID))
            };
            alert("likeinfo:"+JSON.stringify(likeinfo));
            // 向后端发送POST请求来更新like表
            const response = await doJSONPost('/Like',likeinfo);
            alert("response:"+JSON.stringify(response));
            let resp = resp2Json(response);
            alert("resp:"+JSON.stringify(resp));
            if (resp.code === 0) {
                // 更新点赞状态
                setIsLiked(true);
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
                const notesInfo = await doGet('/Travelogue/'+id);
                console.log("notesInfo111111111" + JSON.stringify(notesInfo));
                const resp = resp2Json(notesInfo);
                console.log("noteDetailInfo" + JSON.stringify(resp.data));
                // alert("noteDetailInfo" + JSON.stringify(resp.data));
                setTravelogueInfo(resp.data);
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
        { id: 1, author: '陈昱', content: '真让人心驰神往' },
        { id: 2, author: '严寒', content: '那真是太酷啦！！！！！！！' },
    ]);
    const LikeButton = () => {
        if (isLiked) {
            return <HeartFilled style={{ color: 'red' }} onClick={handleLike} />;
        } else {
            return <HeartOutlined onClick={handleLike} />;
        }
    };

    const handleAddComment = (values) => {
        const newComment = {
            id: comments.length + 1,
            author: '用户名',
            content: values.comment,
        };
        setComments([...comments, newComment]);
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
                                <Tag key={tag.Name}  color={"geekblue"}>{tag.Name}</Tag>
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
                    <span>浏览量：{0}</span>
                </div>
                <div>
                    {/*增加爱心图标*/}
                    <HeartOutline style={{ marginRight: 5 }}/>
                    <span>点赞量：{0}</span>
                    <LikeButton/>

                </div>
            </div>
            {/* 评论区 */}
            <Card>
                <div className="comments-section">
                    <h3>评论区</h3>
                    {/* 添加评论的输入框 */}
                    <Form onFinish={handleAddComment}>
                        <Form.Item name="comment">
                            <TextArea rows={4} placeholder="写下你的评论" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                        </Form.Item>
                    </Form>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            avatar={<Avatar src={comment.avatar} alt={comment.author} />}
                            author={comment.author}
                            content={comment.content}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default TravelogueDetails;
