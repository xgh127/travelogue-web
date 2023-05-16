import {Button, Col, Form, Layout, Row, Input, Typography, Card, Divider} from "antd";
import AppFooter from "../Component/Footer";
import {UserOutline, LockOutline, MailOutline} from 'antd-mobile-icons';
import {useNavigate} from "react-router-dom";
//引入src下Assets文件夹下的图片
import background from "../Assets/background.jpg";

const RegisterView = () => {
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
                            <Typography.Title style={{ fontFamily: "Arial, sans-serif", fontSize: "24px", textAlign: "center" }}>注册交游记</Typography.Title>
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

                                    name="password"

                                    label={<LockOutline fontSize={20}/>}
                                    rules={[{ required: true, message: "请输入密码!" }]}
                                >
                                    <Input.Password style={{width: "100%" ,height:"40px"}} type={"password"}  placeholder="请输入密码"/>
                                </Form.Item>
                                <Form.Item
                                    name="password"
                                    label={<LockOutline fontSize={20}/>}
                                    rules={[{ required: true, message: "再次输入密码!" }]}
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