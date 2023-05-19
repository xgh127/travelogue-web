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
import {Constant} from "../Utils/constant";
const { Header } = Layout;
const { SubMenu } = Menu;




const AdministratorHeader = () => {
    const navigate = useNavigate();
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
        <Header className="app-header">
            <div className="logo" />
            <div className="right-container">
                <Menu theme="dark" mode="horizontal">
                    <div className={"title"}>
                        <h2>交游记后台管理界面</h2>
                    </div>
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

export default AdministratorHeader;