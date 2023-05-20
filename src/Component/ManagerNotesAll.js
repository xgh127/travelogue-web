import React, {useEffect, useState} from 'react';
import {
    Layout,
    Menu,
    Button,
    Avatar,
    Dropdown,
    Table,
    Space,
    Modal,
    Radio,
    Select,
    Popconfirm,
    message,
    Image,
    Badge
} from 'antd';
import {useNavigate} from "react-router-dom";
import {doDelete, doGet, doJSONPost, doJSONPut} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import * as XLSX from 'xlsx';
import ExportJsonExcel from 'js-export-excel';
const { Sider,Content } = Layout;



const ManagerNotesAll = () => {
    const navigate = useNavigate();

    const parentColumns = [
        {
            title: '封面',
            width: 50,
            dataIndex: 'cover',
            key: 'cover',
            fixed: 'left',
            ellipsis: true,
            // render:(record)=>{
            //
            //         <img src={record.cover} style= {{ width: '100%' }}/>
            // }
            render:(cover) => (<Image src={cover} alt="日志封面" width={100} />)
        },
        {
            title: '发表时间',
            width: 50,
            dataIndex: 'PublishTime',
            key: 'PublishTime',
            fixed: 'left',
            // ellipsis: true,
            sorter: (a,b)=> {
                let aTime = new Date(a.PublishTime).getTime();
                let bTime = new Date(b.PublishTime).getTime();
                return aTime - bTime;

            },
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
            sorter: (a, b)=>a.Title.length - b.Title.length,


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
            sorter: (a, b)=>a.Author.UserName.length - b.Author.UserName.length,
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
            sorter:(a,b)=> a.Status-b.Status,
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
        window.location.reload();
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
        } ,{
            title: '数据统计',
            path: '/AdminData'
        }
    ];

    /*excel表头*/

    const downloadFileToExcel = () => {
        console.log("开始导出");
        let dataTable = [];
        console.log("1");
        let option = {};
        console.log("2");
        dataTable = dataSource;
        console.log(dataTable);
        option.fileName = '游记汇总';
        const Format=(dataTable)=>{
            const list = dataTable;

            for (let index = 0; index < list.length; index++){

                /*输入状态*/
                let tmp = list[index]['Status'];
                let a ={
                    '0':'本地草稿',
                    '1':'已上传未分配',
                    '2':'已分配未审核',
                    '3':'审核通过',
                    '4':'终审不通过',
                    '5':'被管理员撤回不显示',
                };
                list[index]['Status'] = a[tmp];

                list[index]['UserName'] = list[index]['Author']['UserName'];
            }
            return list;
        }
        let data = Format(dataTable);
        option.datas=[
            {
                //第一个sheet
                sheetData:data,
                sheetName:'sheet',
                sheetFilter:['id','Title','UserName','abstract','Content','PublishTime','Status'],
                sheetHeader:['游记ID','标题','作者','摘要','内容','发表时间','状态']
            },
        ];
        console.log(option);
        const toExcel = new ExportJsonExcel(option);
        console.log(toExcel);
        toExcel.saveExcel();
        window.location.reload();

    }

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
                <Button style={{width:150,marginBottom:0,}} onClick={()=>{downloadFileToExcel()}}>导出excel数据</Button>
                <Content >
                    <div
                        style={{
                            padding: 50,
                        }}
                    >
                        <Table
                            rowKey={record => record.id}
                            columns={parentColumns}
                            dataSource={dataSource}
                            scroll={{
                                x:800,
                                y:600,
                            }}
                            expandable={{
                                expandedRowRender: (record)=> {
                                    const childColumn =[
                                            {
                                                title:'评论人',
                                                dataIndex:'ParentId',
                                                key:'ParentId',
                                                // render: async (ParentId)=>{
                                                //     console.log(ParentId);
                                                //     const a =  await doGet('/User/'+ParentId);
                                                //     console.log(a);
                                                //     let tmp = JSON.parse(JSON.stringify(a.data));
                                                //     console.log(tmp.UserName);
                                                //     let l = tmp.UserName;
                                                //     return ParentId;
                                                // }

                                            },
                                            {
                                                title: '评论内容',
                                                dataIndex: 'Content',
                                                key:'Content',
                                            },
                                            {
                                                title: '评论时间',
                                                dataIndex: 'CommentTime',
                                                key:'CommentTime',

                                            }
                                        ];
                                    const childData = record.Commments;
                                    return <Table columns={childColumn} dataSource={childData} pagination={false}/>;
                                },
                                defaultExpandedRowKeys: ['0'],
                            }}

                        />
                    </div>
                </Content>
            </div>
        </Layout>
    );

};

export default ManagerNotesAll;
