import React, {useEffect, useState} from 'react';
import {Table, Avatar, Image, Tabs, Form, Input, Button, Select} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../CSS/PersonalProfile.css";
import {Constant} from "../Utils/constant";
import {doGet, doJSONPost, doJSONPut} from "../Utils/ajax";
import {Option} from "antd/es/mentions";
import {useNavigate} from "react-router-dom";

const { Column } = Table;
const { TabPane } = Tabs;

const MainEditorProfile = () => {
    const [activeTab, setActiveTab] = useState('published');
    const [editMode, setEditMode] = useState(false);
    const [matched, setMatched] = useState('');
    const [saved, setSaved] = useState('');
    const [status1, setstatus1] = useState([]);//储存status为0的文章
    const [status2, setstatus2] = useState([]);
    const [status3, setstatus3]= useState([]);
    const [status4, setstatus4]= useState([]);
    const [status5, setstatus5]= useState([]);
    const [editor, setEditor] = useState([]);
    const [likes, setlikes] = useState([]);
    const [history, setHistory] = useState([]);

    let user = localStorage.getItem(Constant.USER);
    let userJson = JSON.parse(user);
    let userid = userJson.id;

    useEffect(() => {
        getStatus();
    }, []);


    const getStatus = async () => {
        let userresp = await doGet('/User');
        let logueresp = await doGet('/Travelogue');

        let tempStatus1 = [];
        let tempStatus2 = [];
        let tempStatus3 = [];
        let tempStatus4 = [];
        let tempeditor = [];

        logueresp.data.filter((item) => {
            if (item.Status === 1) {
                // console.log(item);
                tempStatus1.push(item);
            } else if (item.Status === 2) {
                tempStatus2.push(item);
            } else if (item.Status === 3) {
                tempStatus3.push(item);
            } else if (item.Status === 4) {
                tempStatus4.push(item);
            }
        });

        userresp.data.filter((item) => {
            if(item.UserAuth.userType == 2){
                // console.log(item);
                tempeditor.push(item);
            }
        })

        setstatus1(tempStatus1);
        setstatus2(tempStatus2);
        setstatus3(tempStatus3);
        setstatus4(tempStatus4);
        setEditor(tempeditor);
        // console.log("临时",tempStatus1); // 输出临时状态数组
        // console.log("编辑",tempeditor);
    }

    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        // 在此处执行保存操作，可以将 values.phone、values.email 和 values.nickname 发送到服务器或执行其他逻辑
        console.log('保存的电话号码:', values.telephone);
        console.log('保存的邮件地址:', values.email);
        console.log('保存的昵称:', values.Nickname);
        userJson.Nickname = values.Nickname;
        userJson.telephone = values.telephone;
        userJson.emai = values.email;
        console.log(userJson);
        let resp =  await doJSONPut('/User/'+userid, userJson);
        console.log(resp);
        setEditMode(false);
        form.resetFields();
    };

    const handleEdit = () => {
        setEditMode(true);
        console.log(userJson.emai);
        form.setFieldsValue({
            Nickname: userJson.Nickname,
            telephone: userJson.telephone,
            email: userJson.emai,
        });
    };

    const handleCancel = () => {
        form.resetFields();
        setEditMode(false);
    };


    const handleTabChange = (key) => {
        setActiveTab(key);
    };

    const handleAllocate = async (value,record) =>{
        record.Status = 2;
        const data = {
            "Content": '1',
            "EditorName": value
        }
        let resp1 = await doJSONPost('/Audit', data);
        console.log(resp1);
        record.AuditSuggestions = [{"id" : resp1.data.id}]
        record.PublishTime = "2023-05-19T11:18:46.734Z";
        console.log(record);
        let resp = await doJSONPut('/Travelogue/' + record.id, record);
        console.log(resp);
        window.location.reload();
    }


    return (
        <div className="personal-profile">
            <div className="left-column">
                <div className="user-info">
                    {editMode ? (
                        <Form form={form} onFinish={handleSubmit} className="form-container">
                            <div className="avatar-container">
                                <Avatar src={userJson.Avatar} alt="用户头像" size={80} />
                            </div>
                            <h2>{userJson.Nickname}</h2>
                            <Form.Item
                                label="昵称"
                                name="Nickname"
                                rules={[{ required: true, message: '请输入昵称' }]}
                            >
                                <Input prefix={<UserOutlined />} disabled={!editMode} />
                            </Form.Item>
                            <Form.Item
                                label="电话"
                                name="telephone"
                                rules={[{ required: true, message: '请输入电话号码' }]}
                            >
                                <Input prefix={<UserOutlined />} disabled={!editMode} />
                            </Form.Item>
                            <Form.Item
                                label="邮件"
                                name="email"
                                rules={[
                                    { required: true, message: '请输入邮件地址' },
                                    { type: 'email', message: '请输入有效的邮件地址' },
                                ]}
                            >
                                <Input prefix={<UserOutlined />} disabled={!editMode} />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <div className="centered-info">
                            <div className="avatar-container">
                                <Avatar src={userJson.Avatar} alt="用户头像" size={80} />
                            </div>
                            <h2>{userJson.Nickname}</h2>
                            <p>邮件：{userJson.emai}</p>
                            <p>电话：{userJson.telephone}</p>
                            <Button onClick={handleEdit}>编辑</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="right-column">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="待分配" key="pending">
                        <Table dataSource={status1} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="cover"
                                key="cover"
                                render={(imageUrl,record) => (
                                    <Image
                                        src={imageUrl}
                                        alt="日志封面"
                                        width={100}
                                    />
                                )}
                            />
                            <Column
                                title="标题"
                                dataIndex="Title"
                                key="Title"
                            />
                            <Column
                                title="简介"
                                dataIndex="abstract"
                                key="abstract"
                            />
                            <Column
                                title="审核状态"
                                dataIndex="Status"
                                key="Status"
                                render={(status) => {
                                    if (status === 1) {
                                        return "未分配";
                                    }
                                    return status;
                                }}
                            />
                            <Column
                                title="分配编辑"
                                dataIndex="assignee"
                                key="assignee"
                                render={(text, record) => (
                                    <Select
                                        style={{ width: 120 }}
                                        value={text}
                                        onChange={(value) => handleAllocate(value,record)}
                                        disabled={!!text}
                                    >
                                        <Option value="thunderbo2y">thunderbo2y</Option>
                                        <Option value="1q">1q</Option>
                                    </Select>
                                )}
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="待审核" key="pending-review">
                        <Table dataSource={status2} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="cover"
                                key="cover"
                                render={(imageUrl,record) => (
                                    <Image
                                        src={imageUrl}
                                        alt="日志封面"
                                        width={100}
                                    />
                                )}
                            />
                            <Column
                                title="标题"
                                dataIndex="Title"
                                key="Title"
                            />
                            <Column
                                title="简介"
                                dataIndex="abstract"
                                key="abstract"
                            />
                            <Column
                                title="审核编辑"
                                dataIndex="AuditSuggestions"
                                key="EditorName"
                                render={(value, record) =>(
                                    console.log(record),
                                        <span>{record.AuditSuggestions[0]?.EditorName}</span>
                                )}
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="已通过" key="approved">
                        <Table dataSource={status3} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="cover"
                                key="cover"
                                render={(imageUrl,record) => (
                                    <Image
                                        src={imageUrl}
                                        alt="日志封面"
                                        width={100}
                                    />
                                )}
                            />
                            <Column
                                title="标题"
                                dataIndex="Title"
                                key="Title"
                            />
                            <Column
                                title="简介"
                                dataIndex="abstract"
                                key="abstract"
                            />
                            <Column
                                title="审核意见"
                                dataIndex="content"
                                key="content"
                                render={(value, record) =>(
                                    console.log(record),
                                        <span>{record.AuditSuggestions[0]?.Content}</span>
                                )}
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="未通过" key="rejected">
                        <Table dataSource={status4} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="cover"
                                key="cover"
                                render={(imageUrl,record) => (
                                    <Image
                                        src={imageUrl}
                                        alt="日志封面"
                                        width={100}
                                    />
                                )}
                            />
                            <Column
                                title="标题"
                                dataIndex="Title"
                                key="Title"
                            />
                            <Column
                                title="简介"
                                dataIndex="abstract"
                                key="abstract"
                            />
                            <Column
                                title="审核意见"
                                dataIndex="content"
                                key="content"
                                render={(value, record) =>(
                                    console.log(record),
                                        <span>{record.AuditSuggestions[0]?.Content}</span>
                                )}
                            />
                        </Table>
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}


export default MainEditorProfile;