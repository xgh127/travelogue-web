import {Button, Col, Form, Layout, Row, Input, Typography, Card} from "antd";
import AppFooter from "../Component/Footer";
import {UserOutline, LockOutline, MailOutline, PictureOutline, PhonebookOutline} from 'antd-mobile-icons';
import {useNavigate} from "react-router-dom";
import React from "react";
//引入src下Assets文件夹下的图片
import background from "../Assets/background.jpg";
import InitalAvatar from "../Assets/InitalAvatar.jpg"
import {doJSONPost, ip} from "../Utils/ajax";
import {RegisterFailMsg, RegisterSuccessMsg} from "../Utils/Message";
const bcrypt = require('bcryptjs');
const RegisterView = () => {
    const navigate = useNavigate();
    const  onFinish = async (values) => {
        console.log("Received values of form: ", values);
        const rawPassword = values.password;
        let hashedPassword = null;
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(rawPassword, salt, async function (err, hash) {
                // Store hash in your password DB.
                hashedPassword = hash;
                console.log("hashed" + hashedPassword);
                const userAuth = {
                    "userType": 1,
                    "password": hashedPassword,
                    "UserName": values.username,
                    "salt": "123",
                };
                bcrypt.compare(rawPassword,hashedPassword, function(err, res) {
                    // res === true
                    alert("是否一致"+res);
                });
                console.log("userAuth"+JSON.stringify(userAuth));
                let res = await doJSONPost('/UserAuth', userAuth);
                let authId = res.data.id;
                const testUser1 = {
                    "UserName": values.username,
                    "Nickname": values.nickname,
                    "emai": values.email,
                    "telephone": values.telephone,
                    "description": "add description",
                    "UserAuth": {
                        'id': authId,
                    }
                };
                console.log(testUser1);
                let resp = await doJSONPost('/User', testUser1);
                // alert(JSON.stringify(resp));
                if (resp.code === 0){
                    RegisterSuccessMsg();
                    navigate('/login');
                }else{
                    RegisterFailMsg();
                }

            });
        });
        bcrypt.compare(rawPassword,hashedPassword, function(err, res) {
            // res === true
            console.log(res);
        });

    };

    return(
        <Layout >
            <Layout.Header style={{zIndex:2}} />
            <Layout.Content style={{ padding: "50px",zIndex:1,backgroundImage:'url('+background+')',backgroundSize:"cover"}} >
                <Row justify="center" align="middle" style={{ minHeight: "80vh" ,marginRight:"-50px"}}>
                    <Col span={8} >
                        <Card  style={{ maxWidth: "450px"}}>
                            <Typography.Title style={{ fontFamily: "Arial, sans-serif", fontSize: "24px", textAlign: "center" }}>注册交游记</Typography.Title>
                            <Form

                                //降低表单宽度
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    // name="Avatar"
                                    label={<PictureOutline fontSize={20} />}
                                >
                                    <img src={InitalAvatar} width={"80px"} name="Avatar" alt="初始头像" />
                                </Form.Item>
                                <Form.Item
                                name="username"
                                rules={[{ required: true, message: "请输入真实姓名!" }]}
                                label={<UserOutline fontSize={20}/>}
                                >
                                {/*增加输入框高度*/}
                                <Input style={{ width:"100%",height:"40px"}} type={"text"}  placeholder="请输入真实姓名"/>
                                </Form.Item>

                                <Form.Item
                                    name="nickname"
                                    rules={[{ required: true, message: "请输入用户名!" }]}
                                    label={<UserOutline fontSize={20}/>}
                                >
                                    {/*增加输入框高度*/}
                                    <Input style={{ width:"100%",height:"40px"}} type={"text"}  placeholder="请输入用户名"/>
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[]}
                                    label={<MailOutline fontSize={20}/>}
                                >
                                    {/*增加输入框高度*/}
                                    <Input style={{ width:"100%",height:"40px"}} type={"email"}  placeholder="请输入邮箱"/>
                                </Form.Item>
                                <Form.Item
                                    name="telephone"
                                    rules={[
                                            { pattern: new RegExp(/^1(3|4|5|6|7|8|9)\d{9}$/, "g"),
                                                message: "请输入正确的手机号"}
                                          ]}
                                    label={<PhonebookOutline fontSize={20}/>}
                                >
                                    {/*增加输入框高度*/}
                                    <Input style={{ width:"100%",height:"40px"}} type={"number"}  placeholder="请输入电话号码"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label={<LockOutline fontSize={20}/>}
                                    rules={[{ required: true, message: "请输入密码!" }]}
                                >
                                    <Input.Password style={{width: "100%" ,height:"40px"}} type={"password"}  placeholder="请输入密码"/>
                                </Form.Item>
                                <Form.Item
                                    name="password2"
                                    label={<LockOutline fontSize={20}/>}
                                    rules={[{ required: true, message: "再次输入密码!" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("两次密码不一致!"));
                                            },
                                        }),
                                        ]}
                                >

                                    <Input.Password style={{width: "100%" ,height:"40px"}} type={"password"}  placeholder="再次输入密码"/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit"  style={{ width: "80%" }} >
                                        注册
                                    </Button>
                                </Form.Item>
                            </Form>

                        </Card>
                    </Col>
                </Row>
            </Layout.Content>
            <AppFooter style={{position:"relative",zIndex:2}} />
        </Layout>
    )
}
export default RegisterView;