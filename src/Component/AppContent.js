import React from "react";
import {Content} from "antd/es/layout/layout";
import {Button, theme} from "antd";
import {useNavigate} from "react-router-dom";
import {ArrowLeftOutlined} from "@ant-design/icons";

//定义一个展示信息的容器组件，传入需要展示的一系列信息
export const AppContent=(props)=>{
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate=useNavigate();
    return(
        <Content
            className="site-layout"
            style={{
                padding: '0 50px',
            }}
        >

            <div
                style={{
                    padding: 24,
                    minHeight: 380,
                    background: colorBgContainer,
                }}
            >
                {/*把按钮固定在页面左上角*/}
                <Button  shape="circle" icon={<ArrowLeftOutlined/>} style={{ position: 'fixed', top: 80, left: 20 }} onClick={()=>{navigate(-1)}}>返回</Button>
                {props.children}
            </div>
        </Content>
    )
}
