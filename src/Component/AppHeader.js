import React from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { UserOutlined} from '@ant-design/icons';
import '../CSS/AppHeader.css';
import 'antd/dist/antd.css';
import SearchBar from "./SearchBar";
const { Header } = Layout;
const { SubMenu } = Menu;

const menu = (
    <div>
    {/*    增加一个用户名，使其与Item对其*/}
        <Menu>
            <>
                <div className="user-name">用户名</div>
            </>
            <Menu.Item key="1">个人信息</Menu.Item>
            <Menu.Item key="2">设置</Menu.Item>
            <Menu.Item key="3">退出登录</Menu.Item>
        </Menu>
    </div>
);

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
                            onSearch={(value) => console.log(value)}
                        />

            </div>
            <div className="right-container">
                <Menu theme="dark" mode="horizontal">
                        <Button type="primary" className="TopButton">写游记</Button>
                        <Button className="TopButton">我的消息</Button>
                    <SubMenu
    title={
        <div className="user-info">

            <Dropdown overlay={menu}>
                <Avatar icon={<UserOutlined/>}/>

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