import React from 'react';
import {Layout} from "antd";
import AppFooter from "../Component/Footer";
import {AppContent} from "../Component/AppContent";
import LoginHeader from "../Component/LoginHeader";
import PersonalProfile from "../Component/PersonalProfile";

const PersonCenterView = () => {
    return (
        <Layout>
            <LoginHeader title={'个人中心'}/>
            <AppContent children={  <PersonalProfile/>}/>
            <AppFooter/>
        </Layout>
    );
};

export default PersonCenterView;
