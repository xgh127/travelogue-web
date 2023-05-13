import React from 'react';
import { Layout, Row, Col, Button, Typography, Card } from 'antd';
import 'antd/dist/antd.css';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Homepage = () => {
    return (
        <Layout className="layout">
            <Header>
                <Row justify="space-between" align="middle">
                    <Col>
                        <Title level={3} style={{ color: '#fff', marginBottom: 0 }}>TravelBug</Title>
                    </Col>
                    <Col>
                        <Button style={{ backgroundColor: "transparent", border: "none" }}>Sign Up</Button>
                        <Button type="primary">Log In</Button>
                    </Col>
                </Row>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Row justify="center" align="middle" gutter={[16, 16]}>
                        <Col span={24}>
                            <img src="https://via.placeholder.com/1500x500" style={{ maxWidth: '100%' }} alt="hero image" />
                        </Col>
                        <Col span={12}>
                            <Title>Explore the world with TravelBug</Title>
                            <p>TravelBug is a platform for travel enthusiasts to share their experiences and connect with other like-minded travelers from around the world. Browse through thousands of travelogues, tips, and itineraries shared by our community.</p>
                            <Button type="primary" size="large">Get Started</Button>
                        </Col>
                    </Row>
                    <Row justify="center" style={{ marginTop: '40px' }}>
                        <Col span={20}>
                            <Title level={2}>Popular Destinations</Title>
                            <Row gutter={[16, 16]}>
                                <Col span={8}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src="https://via.placeholder.com/200x200" />}
                                        bodyStyle={{ padding: '20px' }}
                                    >
                                        <Title level={4}>Paris, France</Title>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src="https://via.placeholder.com/200x200" />}
                                        bodyStyle={{ padding: '20px' }}
                                    >
                                        <Title level={4}>Tokyo, Japan</Title>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </Card>
                                </Col>
                                <Col span={8}>
                                    <Card
                                        hoverable
                                        cover={<img alt="example" src="https://via.placeholder.com/200x200" />}
                                        bodyStyle={{ padding: '20px' }}
                                    >
                                        <Title level={4}>Sydney, Australia</Title>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>TravelBug ©2021 Created by Your Name</Footer>
        </Layout>
    );
};

export default Homepage;
