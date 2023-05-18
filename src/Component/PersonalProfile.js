import React, {useEffect, useState} from 'react';
import { Table, Avatar, Image, Tabs, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../CSS/PersonalProfile.css";
import {Constant} from "../Utils/constant";
import {doGet} from "../Utils/ajax";

const { Column } = Table;
const { TabPane } = Tabs;

const PersonalProfile = () => {
    const [activeTab, setActiveTab] = useState('published');
    const [editMode, setEditMode] = useState(false);
    const [matched, setMatched] = useState('');

    let user = localStorage.getItem(Constant.USER);
    let userJson = JSON.parse(user);
    let userType = userJson.UserAuth.userType;
    let userid = userJson.id;

    useEffect(() => {
        getlogues();
    }, []);

    const getlogues = async () => {
        try {
            let resp = await doGet('/Travelogue');
            // 在这里处理获取到的游记信息
            if (resp.code === 0) {
                for (const key in resp.data) {
                    const matchedlogue = resp.data.filter((item) => item.Author.id === userid);
                    setMatched(matchedlogue);
                }
                console.log(matched);
                console.log(matched[0].abstract);
                console.log(matched[0].Author.Nickname);
            } else {
                console.error('获取游记信息失败');
            }
        } catch (error) {
            console.error('请求出错：', error);
        }
    }

    const notes = [
        {
            title: '西湖印象',
            summary: '西泠印社坐落于孤山南麓、西泠桥畔，于方寸中藏万千气象，堪称西湖园林艺术的精华。',
            imageUrl: 'https://pic3.zhimg.com/v2-d348949f4f1b98d153aaef1a1d01d0c2_b.webp?consumer=ZHI_MENG',
            author: { name: '山川游客', avatarUrl: 'https://img.wxcha.com/m00/12/db/594dd9fb43029a58df9acc0e4591d94b.jpg' },
            likes: 10,
            comments: 5,
        },

    ];

    const formItems = [
        {
            label: '昵称',
            name: 'nickname',
            rules: [{ required: true, message: '请输入昵称' }],
        },
        {
            label: '电话',
            name: 'phone',
            rules: [{ required: true, message: '请输入电话号码' }],
        },
        {
            label: '邮件',
            name: 'email',
            rules: [
                { required: true, message: '请输入邮件地址' },
                { type: 'email', message: '请输入有效的邮件地址' },
            ],
        },
        // 添加其他基础信息的表单项
    ];

    const [form] = Form.useForm();

    const handleSubmit = (values) => {
        console.log('表单提交的值:', values);
        // 在此处处理表单提交的逻辑，例如更新个人资料
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setEditMode(false);
    };

    const renderFormItems = () => {
        return formItems.map((item) => (
            <Form.Item
                key={item.name}
                label={item.label}
                name={item.name}
                rules={item.rules}
            >
                <Input prefix={<UserOutlined />} disabled={!editMode} />
            </Form.Item>
        ));
    };

    const handleTabChange = (key) => {
        setActiveTab(key);
    };
if(userType == 1){
    return (
        <div className="personal-profile">
            <div className="left-column">
                <div className="user-info">
                    {editMode ? (
                        <Form form={form} onFinish={handleSubmit} className="form-container">
                            <div className="avatar-container">
                                <Avatar src={notes[0].author.avatarUrl} alt="用户头像" size={80} />
                            </div>
                            <h2>{notes[0].author.name}</h2>
                            {renderFormItems()}
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
                            <Button onClick={handleEdit}>编辑</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="right-column">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="我发布的" key="published">
                        <Table dataSource={matched} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="cover"
                                key="cover"
                                render={(cover) => <Image src={cover} alt="日志封面" width={100} />}
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
                                title="获赞数"
                                dataIndex="Likes"
                                key="Likes"
                            />
                            <Column
                                title="评论数"
                                dataIndex="Comments"
                                key="Comments"
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="喜欢" key="liked">
                    </TabPane>
                    <TabPane tab="浏览记录" key="history">
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

else if(userType == 2){
    return (
        <div className="personal-profile">
            <div className="left-column">
                <div className="user-info">
                    {editMode ? (
                        <Form form={form} onFinish={handleSubmit} className="form-container">
                            <div className="avatar-container">
                                <Avatar src={notes[0].author.avatarUrl} alt="用户头像" size={80} />
                            </div>
                            <h2>{notes[0].author.name}</h2>
                            {renderFormItems()}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <div className="centered-info">
                            <div className="avatar-container">
                                <Avatar src={notes[0].author.avatarUrl} alt="用户头像" size={80} />
                            </div>
                            <h2>{notes[0].author.name}<strong>（编辑）</strong></h2>
                            <p>待审核：{notes[0].likes}</p>
                            <p>已通过：{notes[0].likes}</p>
                            <p>未通过：{notes[0].likes}</p>
                            <Button onClick={handleEdit}>编辑个人资料</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="right-column">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="待审核" key="pending">
                        <Table dataSource={notes} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="imageUrl"
                                key="imageUrl"
                                render={(imageUrl) => <Image src={imageUrl} alt="日志封面" width={100} />}
                            />
                            <Column
                                title="标题"
                                dataIndex="title"
                                key="title"
                            />
                            <Column
                                title="简介"
                                dataIndex="summary"
                                key="summary"
                            />
                            <Column
                                title="审核状态"
                                dataIndex="likes"
                                key="likes"
                            />
                            <Column
                                title="审核意见"
                                dataIndex="comments"
                                key="comments"
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="已通过" key="liked">
                    </TabPane>
                    <TabPane tab="未通过" key="history">
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
    }
else if(userType == 3){
    return (
        <div className="personal-profile">
            <div className="left-column">
                <div className="user-info">
                    {editMode ? (
                        <Form form={form} onFinish={handleSubmit} className="form-container">
                            <div className="avatar-container">
                                <Avatar src={notes[0].author.avatarUrl} alt="用户头像" size={80} />
                            </div>
                            <h2>{notes[0].author.name}</h2>
                            {renderFormItems()}
                            <Form.Item>
                                <Button type="primary" htmlType="submit">保存</Button>
                                <Button onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <div className="centered-info">
                            <div className="avatar-container">
                                <Avatar src={notes[0].author.avatarUrl} alt="用户头像" size={80} />
                            </div>
                            <h2>{notes[0].author.name}<strong>（主编）</strong></h2>
                            <p>待分配：{notes[0].likes}</p>
                            <p>待审核：{notes[0].likes}</p>
                            <p>已通过：{notes[0].likes}</p>
                            <p>未通过：{notes[0].likes}</p>
                            <Button onClick={handleEdit}>编辑个人资料</Button>
                        </div>
                    )}
                </div>
            </div>
            <div className="right-column">
                <Tabs activeKey={activeTab} onChange={handleTabChange}>
                    <TabPane tab="待分配" key="pending">
                        <Table dataSource={notes} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="imageUrl"
                                key="imageUrl"
                                render={(imageUrl) => <Image src={imageUrl} alt="日志封面" width={100} />}
                            />
                            <Column
                                title="标题"
                                dataIndex="title"
                                key="title"
                            />
                            <Column
                                title="简介"
                                dataIndex="summary"
                                key="summary"
                            />
                            <Column
                                title="审核状态"
                                dataIndex="likes"
                                key="likes"
                            />
                            <Column
                                title="审核意见"
                                dataIndex="comments"
                                key="comments"
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="已分配" key="allocated">
                        <Table dataSource={notes} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="imageUrl"
                                key="imageUrl"
                                render={(imageUrl) => <Image src={imageUrl} alt="日志封面" width={100} />}
                            />
                            <Column
                                title="标题"
                                dataIndex="title"
                                key="title"
                            />
                            <Column
                                title="简介"
                                dataIndex="summary"
                                key="summary"
                            />
                            <Column
                                title="审核状态"
                                dataIndex="likes"
                                key="likes"
                            />
                            <Column
                                title="审核意见"
                                dataIndex="comments"
                                key="comments"
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="待审核" key="pending-review">
                        <Table dataSource={notes} pagination={false}>
                            <Column
                                title="封面"
                                dataIndex="imageUrl"
                                key="imageUrl"
                                render={(imageUrl) => <Image src={imageUrl} alt="日志封面" width={100} />}
                            />
                            <Column
                                title="标题"
                                dataIndex="title"
                                key="title"
                            />
                            <Column
                                title="简介"
                                dataIndex="summary"
                                key="summary"
                            />
                            <Column
                                title="审核状态"
                                dataIndex="likes"
                                key="likes"
                            />
                            <Column
                                title="审核意见"
                                dataIndex="comments"
                                key="comments"
                            />
                        </Table>
                    </TabPane>
                    <TabPane tab="已通过" key="approved">
                    </TabPane>
                    <TabPane tab="未通过" key="rejected">
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}
}


export default PersonalProfile;