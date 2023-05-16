import React from 'react';
import {Layout} from "antd";
import AppFooter from "../Component/Footer";
import {AppContent} from "../Component/AppContent";
import LoginHeader from "../Component/LoginHeader";
import TravelogueDetail from "../Component/TravelogueDetail";

const TravelogueDetailView = () => {
    return (
        <Layout>
            <LoginHeader title={'游记详情'}/>
            <AppContent children={ <TravelogueDetail/>}/>
            <AppFooter/>
        </Layout>
    );
};

export default TravelogueDetailView;
