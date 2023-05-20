import React, {useEffect, useState} from 'react';
import {Layout, Menu, Button, Avatar, Dropdown, Space} from 'antd';
import {
    CommentOutlined,
    PlusOutlined,
    UserOutlined
} from '@ant-design/icons';
import '../CSS/AppHeader.css';
// import 'antd/dist/antd.css';
import SearchBar from "./SearchBar";
import {useNavigate} from "react-router-dom";
import {Constant} from "../Utils/constant";

const { Header } = Layout;
const { SubMenu } = Menu;





const AppHeader = () => {
    const navigate = useNavigate();
    const navigationLinks = [
        {
            title: '首页',
            path: '/',
            onClick: () => {
                console.log('首页');
                navigate('/');
                //获取协同过滤推荐结果

            },
        },
        {
            title: '最新游记',
            path: '/latest-travelogue',
            onClick: () => {
                console.log('最新游记');
            },
        },
        {
            title: '最热游记',
            path: '/hottest-travelogue',
            onClick: () => {
                console.log('最热门游记');
                navigate('/ViewsRecommend');
            },
        },
        {
            title: '推荐游记',
            path: '/recommend',
            onClick: () => {
                console.log('推荐游记');
                navigate('/CollaborativeFiltering');

            },
        }

    ];
    const menu = (
        <div>
            {/*    增加一个用户名，使其与Item对其*/}
            <Menu>
                <div className="user-name"><b>惜取少年时</b></div>
                <Menu.Item key="1" onClick={()=>{navigate('/personalCenter')}}>个人信息</Menu.Item>
                    <Menu.Item key="2">通用设置</Menu.Item>
                    <Menu.Item key="3">内容管理</Menu.Item>
                    <Menu.Item key="4" onClick={()=>{
                        localStorage.removeItem(Constant.USER);
                        navigate('/login');
                    }}>退出登录</Menu.Item>
                    </Menu>
                    </div>
                    );
    return (
        <Header className='app-header'>

            <div className="logo" />
                <div className="navigation-links">
                    <Menu theme="dark" mode="horizontal">
                    {navigationLinks.map((link) => (
                        <Menu.Item  onClick={link.onClick} >{link.title}</Menu.Item>
                    ))}
                    </Menu>

                </div>
            <div style={{textAlign:'center',marginRight:"150px"}}>
                <h1 style={{color:'orange'}}>交游记</h1>
            </div>

            <div className="right-container">

                <Menu theme="dark" mode="horizontal">
                        <Button type="primary"  className="TopButton" icon={<PlusOutlined/>}
                        onClick={
                            ()=>{
                                let user = localStorage.getItem(Constant.USER);
                                console.log("niengddie = "+JSON.stringify(user))
                                navigate('/TextEditor');
                            }}>写游记</Button>
                        <Button className="TopButton" icon={<CommentOutlined />}>我的消息</Button>
                    <SubMenu
    title={
        <div className="user-info">

            <Dropdown overlay={menu}>
                <Avatar icon={<UserOutlined/>} src={JSON.parse(localStorage.getItem(Constant.USER)).Avatar}/>
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