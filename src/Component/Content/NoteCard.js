import React, {useEffect, useState} from 'react';
import {Card, Avatar, Tag, Space} from 'antd';
import {CommentOutlined, EyeOutlined, HeartFilled, HeartOutlined, InfoOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {doGet} from "../../Utils/ajax";
import {resp2Json} from "../../Utils/Tool";
import {Constant} from "../../Utils/constant";

//游记信息展示卡片
export const NoteCard = ({ note }) => {
    const navigate=useNavigate();
    const [likeNum, setLikeNum] = useState(0);
    const [viewNum, setViewNum] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [commentNum, setCommentNum] = useState(0);
    const LikeButton = () => {
        if (isLiked) {
            return <HeartFilled style={{ color: 'red' }}  />;
        } else {
            return <HeartOutlined  />;
        }
    };
    //渲染组件时获取信息
    useEffect(() => {
        const fetchData = async () => {

            try {

                const notesInfo = await doGet('/Travelogue/'+note.id);
                const resp = resp2Json(notesInfo);
                console.log("noteDetailInfo" + JSON.stringify(resp.data));
                // alert("noteDetailInfo" + JSON.stringify(resp.data));

                const likeInfo = resp.data.Likes;
                //设置点赞数
                setLikeNum(likeInfo.length);
                setCommentNum(resp.data.Commments.length)
                //检查用户是否已经对该游记点赞，并设置点赞状态
                for (let i = 0; i < likeInfo.length; i++) {
                    if (likeInfo[i].UserId === parseInt(localStorage.getItem(Constant.USERID))) {
                        setIsLiked(true);
                        break;
                    }
                }
                //根据id获取浏览量信息
                const viewsInfo = await doGet('/History/?History.TravelId='+note.id);
                //提取viewsInfo中的浏览量
                setViewNum(resp2Json(viewsInfo).data.length/2);
            } catch (error) {
                console.error("Failed to fetch note:", error);
            }
        };

        fetchData();
        //根据id获取游记信息
    }, []);
    return (
        <Card style={{ display: 'flex', }} bordered={true}  onClick={()=>{navigate('/travelogueDetail?id='+note.id)}} hoverable={true}>
            <div style={{ flex: 1, marginRight: 16 }}>
                <img alt="example" style={{ width: '100%' }} src={note.cover} />
            </div>
            <div style={{ flex: 2 }}>
                <h3>{note.Title}</h3>
                <p>{note.abstract}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center',flexDirection: 'column' }}>
                    <Card>
                    <Avatar src={note.Author.Avatar} />
                    <span><b>{note.Author.UserName}</b></span>
                        </Card>
                    <div>
                        <Space size={'small'}>
                        <EyeOutlined style={{ marginRight: 5 }} />
                        <span row={4}>{viewNum}</span>
                        <LikeButton style={{ marginRight: 5 }}/>
                        <span>{likeNum}</span>
                            <CommentOutlined style={{ marginRight: 5 }}/>
                            <span>{commentNum}</span>
                            <div>
                                <span style={{ marginLeft: 10 }}>标签：</span>
                                {note.Tag.map((tag) => {
                                    return (
                                        <Tag  color={"geekblue"}>{tag.Name}</Tag>
                                    );
                                })}
                            </div>
                        </Space>
                    </div>
                {/*    显示游记标签*/}

                </div>
                </div>
            </div>
        </Card>
    );
};