import React, {useEffect, useState} from 'react';
import {Layout, Menu, Button, Avatar, Dropdown, Table, Space, Modal, Radio, Select, Popconfirm, message} from 'antd';
import {useNavigate} from "react-router-dom";
import {doDelete, doGet, doJSONPost, doJSONPut} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import {getUserAuthByUserName} from "../Service/UserAuthService";

const { Sider,Content } = Layout;



const ManagerAll = () => {
    const navigate = useNavigate();
    const columns = [
        {
            title: 'ID',
            width: 50,
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            ellipsis: true,

        },
        {
            title: '名字',
            width: 50,
            dataIndex: 'UserName',
            key: 'UserName',
            fixed: 'left',
            ellipsis: true,
        },
        {
            title: '邮箱',
            width: 50,
            dataIndex: 'emai',
            key: 'emai',
            fixed: 'left',
            ellipsis: true,
        },
        {
            title: '手机',
            width: 50,
            dataIndex: 'telephone',
            key: 'telephone',
            fixed: 'left',
            ellipsis: true,
        },
        {
            title: '权限管理',
            width: 50,
            dataIndex: 'userType',
            key: 'userType',
            fixed: 'left',
            ellipsis: true,
            render:(text,record)=> {
                let config ={
                    '0':'管理员',
                    '1':'普通用户',
                    '2':'编辑',
                    '3':'主编',
                }
                    return(
                    <Select value={text} onChange={(value) => handleUserType(value, record)}
                            defaultValue={config[record.UserAuth.userType]}
                    >
                        <option value="0">管理员</option>
                        <option value="1">普通用户</option>
                        <option value="2">编辑</option>
                        <option value="3">主编</option>
                    </Select>
                    )

            }

        },
        {
            title: '处理',
            width: 70,
            key: 'Status',
            fixed: 'left',
            ellipsis: true,
            render:(_,record) => (
                <Space size="middle">
                    {/*<a onClick={()=>showModal(record)}>权限管理</a>*/}
                    {/*<a onClick={()=> deleteUser(record)}>删除账号</a>*/}
                    <Popconfirm
                        title="删除该账号"
                        description="你确定要删除账号吗?"
                        onConfirm={()=>deleteUser(record)}
                        onCancel={()=>calcel()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link">Delete</Button>
                    </Popconfirm>

                </Space>
            )
        },

    ];
    const handleUserType =async (value, record)=> {
        console.log("进入");
        let id = record.UserAuth.id;
        const userAuthInfo = await doGet('/UserAuth/' + id);
        console.log(value);
        console.log(userAuthInfo);
        let userAuthJson = JSON.parse(JSON.stringify(userAuthInfo.data));
        console.log()
        userAuthJson.userType = parseInt(value);
        console.log(userAuthJson);
        let resp = await doJSONPut('/UserAuth/' + id, userAuthJson);
        console.log(resp);
        window.location.reload();

    };

    const deleteUser = async (record)=> {
        message.error('click on YES');
        console.log("开始删除");
        let resp = await doDelete('/User/'+record.id);
        console.log(resp);
        let resp1 = await doDelete('/UserAuth/'+record.UserAuth.id);
        window.location.reload();
    }

    const calcel = (e) => {
        console.log(e);
        message.error('click on No');
    }
    const [dataSource, setDataSource ] = useState([]);

    useEffect(()=> {
        const fetchData = async ()=>{
            try {
                const userInfo = await doGet('/User');
                const parsedUser = resp2Json(userInfo);
                console.log("userInfo"+JSON.stringify(userInfo.data));
                setDataSource(parsedUser.data);
            } catch (error) {
                console.error("Failed to fetch notes:", error);
            }
        };
        fetchData();
    },[]);


    const navigationLinks = [
        {
            title: '人员角色管理',
            path: '/manager'
        },
        {
            title: '游记汇总',
            path: '/managernotesall'
        },
        {
          title: '数据统计',
            path: '/AdminData'
        }
    ];


    return(
        <Layout hasSider>
            <Sider className="sidebar">
                <div className="demo-logo-vertical" />
                <Menu theme="dark" mode="inline">
                    {navigationLinks.map((link)=>(
                        <Menu.Item key={link.path}  onClick={()=>{navigate(link.path)}}>{link.title}</Menu.Item>
                    ))}
                </Menu>
            </Sider>
            <div className="content">
                <Content >
                    <div
                        style={{
                            padding: 100,
                        }}
                    >
                        <Table
                            columns={columns}
                            dataSource={dataSource}
                            scroll={{
                                x:800,
                                y:2000,
                            }}
                            rowKey='id'
                        />
                    </div>
                </Content>
            </div>
        </Layout>
    );

};

export default ManagerAll;
