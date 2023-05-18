import React from 'react';
import { Card, Avatar } from 'antd';
import {EyeOutlined, HeartOutlined} from "@ant-design/icons";

//游记信息展示卡片
export const NoteCard = ({ note }) => {
    return (
        <Card style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: 16 }}>
                <img alt="example" style={{ width: '100%' }} src={note.imageUrl} />
            </div>
            <div style={{ flex: 2 }}>
                <h3>{note.title}</h3>
                <p>{note.summary}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Avatar src={note.author.avatarUrl} />
                    <span><b>{note.author.name}</b></span>
                    <div>
                        <EyeOutlined style={{ marginRight: 5 }} />
                        <span>{note.views}</span>
                    </div>
                    <div>
                        <HeartOutlined style={{ marginRight: 5 }} />
                        <span>{note.likes}</span>
                    </div>
                </div>
            </div>
        </Card>
    );
};