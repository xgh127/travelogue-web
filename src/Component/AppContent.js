import React from "react";
import {Content} from "antd/es/layout/layout";
import {theme} from "antd";

//定义一个展示信息的容器组件，传入需要展示的一系列信息
export const AppContent=(props)=>{
    const {
        token: { colorBgContainer },
    } = theme.useToken();
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
                {props.children}
            </div>
        </Content>
    )
}
