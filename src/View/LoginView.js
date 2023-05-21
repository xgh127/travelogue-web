import React from "react";
import {Button, Col, Form, Layout, Row, Input, Typography, Card, Divider, message} from "antd";
import AppFooter from "../Component/Footer";
import { UserOutline, LockOutline} from 'antd-mobile-icons';
import {useNavigate} from "react-router-dom";
//引入src下Assets文件夹下的图片
import background from "../Assets/background.jpg";
import {getUserByUserName, loginCheck} from "../Service/UserService";
import {Constant} from "../Utils/constant";

const LoginView = (props) => {
    // const { setUser } = props;
    const navigate = useNavigate();
    const onFinish = async (values) => {
        console.log("Received values of form: ", values);

        let resp = await getUserByUserName(values.Username);
        let res = await loginCheck(values.Password,resp);
        if (res) {

            let user = JSON.stringify(resp.data[0]);
            localStorage.setItem(Constant.USER, user);
            let userJson = JSON.parse(user);
            //debug：管理员和普通用户登录逻辑问题修复
            switch (userJson.UserAuth.userType) {
                case 0:
                    navigate("/manager");
                    break;
                case 1:
                    navigate("/");
                    break;
                case 2:
                    navigate("/editorCenter");
                    break;
                case 3:
                    navigate("/mainEditorCenter");
                    break;
                default:
                    navigate("/");
                    break;
            }
            localStorage.setItem(Constant.USERID, userJson.id)
            message.success("登录成功");
        } else {
            message.error("密码错误");
        }
    };

    return(
        <Layout >
            <Layout.Header style={{zIndex:2}} />
            <Layout.Content style={{ padding: "50px",zIndex:1,backgroundImage:'url('+background+')',backgroundSize:"cover"}} >
                <Row justify="center" align="middle" style={{ minHeight: "80vh" ,marginRight:"-50px"}}>
                    <Col span={8} >
                        <Card  style={{ maxWidth: "450px"}}>
                        <Typography.Title style={{ fontFamily: "Arial, sans-serif", fontSize: "24px", textAlign: "center" }}>登录交游记</Typography.Title>
                        <Form

                                //降低表单宽度
                                onFinish={onFinish}
                                >
                            <Form.Item
                                name="Username"

                                rules={[{ required: true, message: "请输入用户名!" }]}
                                label={<UserOutline fontSize={20}/>}
                            >
                                {/*增加输入框高度*/}
                                <Input style={{ width:"100%",height:"40px"}}  placeholder="请输入用户名"/>
                            </Form.Item>
                            <Form.Item

                                name="Password"

                                label={<LockOutline fontSize={20}/>}

                                rules={[{ required: true, message: "请输入密码!" }]}
                            >
                                <Input.Password style={{width: "100%" ,height:"40px"}}   placeholder="请输入密码"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: "80%" }} >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                            <div style={{marginLeft: '4%', width: '92%'}}>
                                <span style={{float: 'left'}} onClick={()=>navigate("/register", {})}>新用户注册</span>
                                <span style={{float: 'right'}}>忘记密码</span>
                            </div>
                            <Divider style={{marginTop: '7%'}}>其他方式登录</Divider>
                        </Card>
                    </Col>
                </Row>
            </Layout.Content>
            <AppFooter style={{position:"relative",zIndex:2}} />
        </Layout>
    )
}
export default LoginView;