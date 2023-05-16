import {Button, Col, Form, Layout, Row, Input, Typography, Card, Divider} from "antd";
import AppFooter from "../Component/Footer";
import { UserOutline, LockOutline} from 'antd-mobile-icons';
import {useNavigate} from "react-router-dom";
//引入src下Assets文件夹下的图片
import background from "../Assets/background.jpg";

const LoginView = () => {
    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        // Perform login logic here
    };
    const navigate = useNavigate();
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
                                name="username"

                                rules={[{ required: true, message: "请输入用户名!" }]}
                                label={<UserOutline fontSize={20}/>}
                            >
                                {/*增加输入框高度*/}
                                <Input style={{ width:"100%",height:"40px"}}  placeholder="请输入用户名"/>
                            </Form.Item>
                            <Form.Item

                                name="password"

                                label={<LockOutline fontSize={20}/>}

                                rules={[{ required: true, message: "请输入密码!" }]}
                            >
                                <Input.Password style={{width: "100%" ,height:"40px"}}   placeholder="请输入密码"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={{ width: "80%" }}>
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