import { Card, Avatar } from 'antd';

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
                    <span>{note.author.name}</span>
                    <span>{note.views} 浏览</span>
                    <span>{note.likes} 赞</span>
                </div>
            </div>
        </Card>
    );
};