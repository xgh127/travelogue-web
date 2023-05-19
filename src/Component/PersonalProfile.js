import React, {useEffect, useState} from 'react';
import { Table, Avatar, Image, Tabs, Form, Input, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import "../CSS/PersonalProfile.css";
import {Constant} from "../Utils/constant";
import {doGet, doJSONPut} from "../Utils/ajax";

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
if(userType == 1){
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
                    <TabPane tab="待审核" key="pending">
                        <Table dataSource={matched} pagination={false}>
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
// else if(userType == 3){
//     return (
//         <div className="personal-profile">
//             <div className="left-column">
//                 <div className="user-info">
//                     {editMode ? (
//                         <Form form={form} onFinish={handleSubmit} className="form-container">
//                             <div className="avatar-container">
//                                 <Avatar src={notes[0].author.avatarUrl} alt="用户头像" size={80} />
//                             </div>
//                             <h2>{notes[0].author.name}</h2>
//                             {renderFormItems()}
//                             <Form.Item>
//                                 <Button type="primary" htmlType="submit">保存</Button>
//                                 <Button onClick={handleCancel} style={{ marginLeft: 8 }}>取消</Button>
//                             </Form.Item>
//                         </Form>
//                     ) : (
//                         <div className="centered-info">
//                             <div className="avatar-container">
//                                 <Avatar src={notes[0].author.avatarUrl} alt="用户头像" size={80} />
//                             </div>
//                             <h2>{notes[0].author.name}<strong>（主编）</strong></h2>
//                             <p>待分配：{notes[0].likes}</p>
//                             <p>待审核：{notes[0].likes}</p>
//                             <p>已通过：{notes[0].likes}</p>
//                             <p>未通过：{notes[0].likes}</p>
//                             <Button onClick={handleEdit}>编辑个人资料</Button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className="right-column">
//                 <Tabs activeKey={activeTab} onChange={handleTabChange}>
//                     <TabPane tab="待分配" key="pending">
//                         <Table dataSource={notes} pagination={false}>
//                             <Column
//                                 title="封面"
//                                 dataIndex="imageUrl"
//                                 key="imageUrl"
//                                 render={(imageUrl) => <Image src={imageUrl} alt="日志封面" width={100} />}
//                             />
//                             <Column
//                                 title="标题"
//                                 dataIndex="title"
//                                 key="title"
//                             />
//                             <Column
//                                 title="简介"
//                                 dataIndex="summary"
//                                 key="summary"
//                             />
//                             <Column
//                                 title="审核状态"
//                                 dataIndex="likes"
//                                 key="likes"
//                             />
//                             <Column
//                                 title="审核意见"
//                                 dataIndex="comments"
//                                 key="comments"
//                             />
//                         </Table>
//                     </TabPane>
//                     <TabPane tab="已分配" key="allocated">
//                         <Table dataSource={notes} pagination={false}>
//                             <Column
//                                 title="封面"
//                                 dataIndex="imageUrl"
//                                 key="imageUrl"
//                                 render={(imageUrl) => <Image src={imageUrl} alt="日志封面" width={100} />}
//                             />
//                             <Column
//                                 title="标题"
//                                 dataIndex="title"
//                                 key="title"
//                             />
//                             <Column
//                                 title="简介"
//                                 dataIndex="summary"
//                                 key="summary"
//                             />
//                             <Column
//                                 title="审核状态"
//                                 dataIndex="likes"
//                                 key="likes"
//                             />
//                             <Column
//                                 title="审核意见"
//                                 dataIndex="comments"
//                                 key="comments"
//                             />
//                         </Table>
//                     </TabPane>
//                     <TabPane tab="待审核" key="pending-review">
//                         <Table dataSource={notes} pagination={false}>
//                             <Column
//                                 title="封面"
//                                 dataIndex="imageUrl"
//                                 key="imageUrl"
//                                 render={(imageUrl) => <Image src={imageUrl} alt="日志封面" width={100} />}
//                             />
//                             <Column
//                                 title="标题"
//                                 dataIndex="title"
//                                 key="title"
//                             />
//                             <Column
//                                 title="简介"
//                                 dataIndex="summary"
//                                 key="summary"
//                             />
//                             <Column
//                                 title="审核状态"
//                                 dataIndex="likes"
//                                 key="likes"
//                             />
//                             <Column
//                                 title="审核意见"
//                                 dataIndex="comments"
//                                 key="comments"
//                             />
//                         </Table>
//                     </TabPane>
//                     <TabPane tab="已通过" key="approved">
//                     </TabPane>
//                     <TabPane tab="未通过" key="rejected">
//                     </TabPane>
//                 </Tabs>
//             </div>
//         </div>
//     );
// }
}


export default PersonalProfile;