import React from 'react';
import {Layout, Menu, Button, Avatar, Dropdown, Table, Space} from 'antd';
import {useNavigate} from "react-router-dom";

const { Sider,Content } = Layout;

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
        title: '标题',
        width: 50,
        dataIndex: 'title',
        key: 'title',
        fixed: 'left',
        ellipsis: true,
    },
    {
        title: '作者',
        width: 50,
        dataIndex: 'anthor',
        key: 'anthor',
        fixed: 'left',
        ellipsis: true,
    },
    {
        title: '概要',
        width: 50,
        dataIndex: 'summary',
        key: 'summary',
        fixed: 'left',
        ellipsis: true,
    },
    {
        title: '处理',
        width: 70,
        key: 'Status',
        fixed: 'left',
        render:() => (
            <Space size="middle">
                <a>分配</a>
                <a>审批</a>
            </Space>
        )
    },

]
const navigationLinks = [
    {
        title: '初审',
        path: '/administrator',
    },
    {
        title: '二审',
        path: '/second-examine',
    },
    {
        title: '终审',
        path: '/final-examine',
    },
    {
        title: '审批员管理',
        path: '/manager'
    }
];

const AdministratorSidebar = (props) => {
    const navigate = useNavigate();
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
                           dataSource={props.dataSource}
                           scroll={{
                               x:800,
                               y:2000,
                           }}
                       />
                   </div>
               </Content>
           </div>
       </Layout>
   );

};

export default AdministratorSidebar;
