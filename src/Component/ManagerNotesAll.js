import React, {useEffect, useState} from 'react';
import {Layout, Menu, Button, Avatar, Dropdown, Table, Space, Modal, Radio, Select, Popconfirm, message} from 'antd';
import {useNavigate} from "react-router-dom";
import {doDelete, doGet, doJSONPost, doJSONPut} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";

const { Sider,Content } = Layout;



const ManagerNotesAll = () => {
    const navigate = useNavigate();
    const expandedRowRender = (record) => {
        const columns =[
            {
                title:'评论人',
                dataIndex: 'ParentId',
                key:'ParentId',

            },
            {
                title:'评论内容',
                dataIndex: 'Content',
                key:'Content',

            },
            {
                title:'评论时间',
                dataIndex: 'CommentTime',
                key:'CommentTime',

            },
        ];
        const dataSource1=[]
        // useEffect(()=>{
        //     const dataSource1Info = await doGet('/Travelogue')
        // },[]);
        return <Table columns={columns} dataSource={dataSource1} pagination={false} />;
    }
    const columns = [
        {
            title: '封面',
            width: 50,
            dataIndex: 'cover',
            key: 'cover',
            fixed: 'left',
            ellipsis: true,
            render:(record)=>{

                    <img src={record.cover} style= {{ width: '100%' }}/>
            }


        },
        {
            title: '发表时间',
            width: 50,
            dataIndex: 'PublishTime',
            key: 'PublishTime',
            fixed: 'left',
            ellipsis: true,
            sorter: true,
            render:(text)=>{
                if(text[0] == '"'){
                    text = text.split('"')[1];
                }
                text = text.replace('T'," ");
                text = text.replace('Z','');
                return text;
            }
        },
        {
            title: '标题',
            width: 50,
            dataIndex: 'Title',
            key: 'Title',
            fixed: 'left',
            ellipsis: true,

        },
        {
            title: '简介',
            width: 50,
            dataIndex: 'abstract',
            key: 'abstract',
            fixed: 'left',
            ellipsis: true,
        },
        {
            title: '作者',
            width: 50,
            dataIndex: 'UserName',
            key: 'UserName',
            fixed: 'left',
            ellipsis: true,
            render:(_,record)=>{
                return record.Author.UserName;
                }

        },
        {
            title: '评论',
            width: 50,
            dataIndex: 'Comments',
            key: 'Comments',
            fixed: 'left',
            ellipsis: true,
            render:()=>{
                return "见展开";
            }
        },
        {
            title: '游记状态',
            width: 50,
            dataIndex: 'Status',
            key: 'Status',
            fixed: 'left',

            render:(text)=>{
                let tmp ={
                    '0':'本地草稿',
                    '1':'已上传未分配',
                    '2':'已分配未审核',
                    '3':'审核通过',
                    '4':'终审不通过',
                    '5':'被管理员撤回不显示',
                };
                return tmp[text];
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
                        title="撤销该游记"
                        description="你确定要撤销该游记吗?"
                        onConfirm={()=>deleteNote(record)}
                        onCancel={()=>calcel()}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link">撤销游记</Button>
                    </Popconfirm>

                </Space>
            )
        },

    ];

    /*撤销游记*/
    const deleteNote = async (record)=> {
        message.error('click on YES');
        console.log("开始撤销");
        console.log(record.id);
        const travelogueInfo = await doGet('/Travelogue/'+record.id);
        console.log(travelogueInfo);
        let trave = JSON.parse(JSON.stringify(travelogueInfo.data));
        console.log(trave);
        trave.Status = 5;
        console.log(trave)
        let resp = await doJSONPut('/Travelogue/'+record.id, trave);
        console.log(resp);
        // window.location.reload();
    }
    /*导出游记*/


    /*取消撤销或导出操作*/
    const calcel = (e) => {
        console.log(e);
        message.error('click on No');
    }

    const [dataSource, setDataSource ] = useState([]);


    useEffect(()=> {
        const fetchData = async ()=>{
            try {
                const notesInfo = await doGet('/Travelogue');
                const parsedNotes = resp2Json(notesInfo);
                console.log("notesInfo"+JSON.stringify(notesInfo.data));
                setDataSource(parsedNotes.data);
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
        }
    ];

    /*选择框*/
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        onSelect: (record, selected, selectedRows) => {
            console.log(record, selected, selectedRows);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            console.log(selected, selectedRows, changeRows);
        },
    };


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
                <Button style={{width:100,marginBottom:0,}}>批量导出</Button>
                <Content >
                    <div
                        style={{
                            padding: 100,
                        }}
                    >
                        <Table
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={dataSource}
                            scroll={{
                                x:800,
                                y:2000,
                            }}
                            expandable={{expandedRowRender,
                                defaultExpandedRowKeys: ['0'],}}

                        />
                    </div>
                </Content>
            </div>
        </Layout>
    );

};

export default ManagerNotesAll;
