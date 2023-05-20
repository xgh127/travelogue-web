import React from 'react';
import {Layout} from "antd";
import AppFooter from "../Component/Footer";
import MainEditorProfile from "../Component/MainEditorProfile";
import {AppContentEditor} from "../Component/AppContentEditor";
import EditorHeader from "../Component/EditorHeader";

const MainEditorProfileView = () => {
    return (
        <Layout>
            <EditorHeader title={'主编中心'}/>
            <AppContentEditor children={ <MainEditorProfile/>}/>
            <AppFooter/>
        </Layout>
    );
};

export default MainEditorProfileView;
