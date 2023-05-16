import {Button, Col, Form, Layout, Row, Input, Typography, Card, Divider, Avatar} from "antd";
import AppFooter from "../Component/Footer";
import {UserOutline, LockOutline, MailOutline, PictureOutline, PhonebookOutline, PlusOutline} from 'antd-mobile-icons';
import {useNavigate} from "react-router-dom";
import React, { useState, Component} from "react";
//引入src下Assets文件夹下的图片
import background from "../Assets/background.jpg";
import InitalAvatar from "../Assets/InitalAvatar.jpg"

const RegisterView = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        // Perform login logic here
    };
    const navigate = useNavigate();
    // const upChange = (event) => {
    //     let imgfile = event.currentTarget.files[0];
    //     console.log('我',imgfile)
    //     // if(imgfile.size > )
    //     let reader = new FileReader();
    //     reader.readAsDataURL(imgfile)
    //     reader.onload = function (event){
    //         let  imgs = this.result
    //
    //     }
    // }
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
                                    rules={[{ required: true, message: "请输入邮箱!" }]}
                                    label={<MailOutline fontSize={20}/>}
                                >
                                    {/*增加输入框高度*/}
                                    <Input style={{ width:"100%",height:"40px"}} type={"email"}  placeholder="请输入邮箱"/>
                                </Form.Item>
                                <Form.Item
                                    name="telephone"
                                    rules={[{ required: true, message: "请输入电话号码!" },
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
                                    <Button type="primary" htmlType="submit" style={{ width: "80%" }}>
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