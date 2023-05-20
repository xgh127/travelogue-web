import React from 'react';
import {Avatar, Dropdown, Layout, Menu} from "antd";
import AppFooter from "../Component/Footer";
import Editor from "../Component/TextEditor";
import {AppContent} from "../Component/AppContent";
import LoginHeader from "../Component/LoginHeader";
import TextChange from "../Component/TextChange";

const TextEditorView = () => {
    return (
        <Layout>
            <LoginHeader title={' 修改游记'}/>
            <AppContent children={  <TextChange placeholder={'write something'}/>}/>
            <AppFooter/>
        </Layout>
    );
};

export default TextEditorView;
