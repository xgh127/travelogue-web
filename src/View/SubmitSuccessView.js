import React from 'react';
import {Layout} from "antd";
import AppFooter from "../Component/Footer";
import {AppContent} from "../Component/AppContent";
import LoginHeader from "../Component/LoginHeader";
import FeedBack from "../Component/FeedBack";
import {useNavigate} from "react-router-dom";

const SubmitSuccessView = (props) => {
    const navigate = useNavigate();
    return (
        <Layout>
            <LoginHeader title={'反馈'}/>
            <AppContent children={
                <FeedBack
                    status = {"success"}
                    title = {"提交成功"}
                    help = {"点击继续返回"}
                    function ={() => {
                        navigate('/');
                        }
                    }
                />
            }/>
            <AppFooter/>
        </Layout>
    );
};

export default SubmitSuccessView
