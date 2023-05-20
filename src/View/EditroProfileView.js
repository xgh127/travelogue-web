import React from 'react';
import {Layout} from "antd";
import AppFooter from "../Component/Footer";
import {AppContentEditor} from "../Component/AppContentEditor";
import EditorHeader from "../Component/EditorHeader";
import EditorProfile from "../Component/EditorProfile";

const EditorProfileView = () => {
    return (
        <Layout>
            <EditorHeader title={'编辑中心'}/>
            <AppContentEditor children={ <EditorProfile/>}/>
            <AppFooter/>
        </Layout>
    );
};

export default EditorProfileView;
