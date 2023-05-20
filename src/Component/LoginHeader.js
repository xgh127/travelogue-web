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
import {resp2Json} from "../Utils/Tool";
import {getLocalUser} from "../Service/UserService";
const { Header } = Layout;
const { SubMenu } = Menu;




const LoginHeader = (props) => {
    const navigate = useNavigate();
    const menu = (
        <div>
            {/*    增加一个用户名，使其与Item对其*/}
            <Menu>
                <div className="user-name"><b>{JSON.parse(localStorage.getItem(Constant.USER)).UserName}</b></div>
                <Menu.Item key="1" onClick={()=> {
                    //如果当前页面就是personalCenter
                    if (window.location.pathname !== '/personalCenter') {
                        navigate('/personalCenter');
                    } else {
                        window.location.reload();
                    }
                }
                }>个人信息</Menu.Item>
                <Menu.Item key="2">通用设置</Menu.Item>
                <Menu.Item key="3">内容管理</Menu.Item>
                <Menu.Item key="4" onClick={()=>{
                    localStorage.removeItem(Constant.USER);
                    navigate('/login');
                }}>退出登录</Menu.Item>
            </Menu>
        </div>
    );

    const navigate1 = useNavigate();
    const handleImageClick = () => {
        navigate1('/');
    };
    return (
        <Header className="app-header">
            <div className="logo" />
            <div className="navigation-links">
                    <img style={{marginLeft:"-480px"}} src={SchoolLogo} width={60} height={60} onClick={handleImageClick}/>
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
                                    <Avatar icon={<UserOutlined/>} src={getLocalUser().Avatar}/>
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