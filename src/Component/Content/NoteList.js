import { Affix, List } from "antd";
import React from "react";
import { NoteCard } from "./NoteCard";
import SearchBar from "../SearchBar";

export const NoteList = ({ notes }) => (
    <div style={{ position: "relative" }}>
        <Affix offsetTop={0}>
            <SearchBar className="searchBar" />
        </Affix>
        <List
            style={{ height: "100%" }}
            grid={{ gutter: 16, column: 3 }}
            dataSource={notes}
            renderItem={(note) => (
                <List.Item key={note.id} >
                    <NoteCard note={note} />
                </List.Item>
            )}
        />
    </div>
);
