// 游记列表组件
import {List} from "antd";
import {NoteCard} from "./NoteCard";

export const NoteList = ({ notes }) => (
    <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={notes}
        renderItem={(note) => (
            <List.Item>
                <NoteCard note={note} />
            </List.Item>
        )}
    />
);