import React from 'react';
import {Layout, Menu, Button, Avatar, Dropdown} from 'antd';
import {
    CommentOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import '../CSS/AppHeader.css';
// import 'antd/dist/antd.css';
import SearchBar from "./SearchBar";
import {FloatButton} from "antd";
import {useNavigate} from "react-router-dom";
const { Header } = Layout;
const { SubMenu } = Menu;



const navigationLinks = [
    {
        title: '首页',
        path: '/',
    },
    {
        title: '最新游记',
        path: '/latest-travelogue',
    },
    {
        title: '最热门游记',
        path: '/hottest-travelogue',
    },
];

const AppHeader = () => {
    const navigate = useNavigate();
    const menu = (
        <div>
            {/*    增加一个用户名，使其与Item对其*/}
            <Menu>
                <div className="user-name"><b>惜取少年时</b></div>
                <Menu.Item key="1" onClick={()=>{navigate('/personalCenter')}}>个人信息</Menu.Item>
                    <Menu.Item key="2">通用设置</Menu.Item>
                    <Menu.Item key="3">内容管理</Menu.Item>
                    <Menu.Item key="4">退出登录</Menu.Item>
                    </Menu>
                    </div>
                    );
    return (
        <Header className="app-header">
            <div className="logo" />
                <div className="navigation-links">
                    <Menu theme="dark" mode="horizontal">
                    {navigationLinks.map((link) => (
                        <Menu.Item key={link.path}>{link.title}</Menu.Item>
                    ))}
                    </Menu>
                </div>
            <div className="search-box">
                        <SearchBar className="SearchBar"
                        />
            </div>
            <div className="right-container">
                <Menu theme="dark" mode="horizontal">

                        <Button type="primary"  className="TopButton" icon={<PlusOutlined/>}
                        onClick={()=>{navigate('/TextEditor')}}>写游记</Button>
                        <Button className="TopButton" icon={<CommentOutlined />}>我的消息</Button>
                    <SubMenu
    title={
        <div className="user-info">

            <Dropdown overlay={menu}>
                <Avatar icon={<UserOutlined/>} src="https://img.wxcha.com/m00/c3/3c/90dc57044c2661b42aa62b08a452b81c.jpg"/>
            </Dropdown>
        </div>
    }
    />
                </Menu>
            </div>
        </Header>
    );
};

export default AppHeader;