// 游记信息组件
import {Avatar} from "antd";

export const NoteInfo = ({ title, summary, author, views, likes }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
            <h3>{title}</h3>
            <p>{summary}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Avatar src={author.avatarUrl} />
            <span>{author.name}</span>
            <span>{views} 浏览</span>
            <span>{likes} 赞</span>
        </div>
    </div>
);
