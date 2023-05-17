import React from 'react';
import {Layout, Menu, Button, Avatar, Dropdown, Image} from 'antd';
import {

    UserOutlined
} from '@ant-design/icons';
import '../CSS/AppHeader.css';
import 'antd/dist/reset.css';
import SchoolLogo from '../Assets/schoolLogo.png';
import {Constant} from "../Utils/constant";
import {useNavigate} from "react-router-dom";
const { Header } = Layout;
const { SubMenu } = Menu;




const LoginHeader = (props) => {
    const navigate = useNavigate();
    const menu = (
        <div>
            {/*    增加一个用户名，使其与Item对其*/}
            <Menu>
                <div className="user-name"><b>惜取少年时</b></div>
                <Menu.Item key="1">个人信息</Menu.Item>
                <Menu.Item key="2">通用设置</Menu.Item>
                <Menu.Item key="3">内容管理</Menu.Item>
                <Menu.Item key="4" onClick={
                    ()=>{
                        localStorage.removeItem(Constant.USER);
                        navigate('/login');
                    }
                }>退出登录</Menu.Item>
            </Menu>
        </div>
    );
    return (
        <Header className="app-header">
            <div className="logo" />
            <div className="navigation-links">
             <img style={{marginLeft:"-480px"}} src={SchoolLogo} width={60} height={60}/>
            </div>
            <div style={{textAlign:'center',marginRight:"150px"}}>
                <h1 style={{color:'orange'}}>{props.title}</h1>
            </div>
            <div className="right-container">
                <Menu theme="dark" mode="horizontal">
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

export default LoginHeader;