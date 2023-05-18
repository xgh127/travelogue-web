import React from 'react';
import { Card, Avatar } from 'antd';
import {EyeOutlined, HeartOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

//游记信息展示卡片
export const NoteCard = ({ note }) => {
    const navigate=useNavigate();
    return (
        <Card style={{ display: 'flex' }} onClick={()=>{navigate('/travelogueDetail?id='+note.id)}}>
            <div style={{ flex: 1, marginRight: 16 }}>
                <img alt="example" style={{ width: '100%' }} src={note.cover} />
            </div>
            <div style={{ flex: 2 }}>
                <h3>{note.Title}</h3>
                <p>{note.abstract}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar src={note.Author.Avatar} />
                    <span><b>{note.Author.UserName}</b></span>
                    <div>
                        <EyeOutlined style={{ marginRight: 5 }} />
                        <span>{0}</span>
                    </div>
                    <div>
                        <HeartOutlined style={{ marginRight: 5 }} />
                        <span>{0}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};