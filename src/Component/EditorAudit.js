import React, {useEffect, useState} from 'react';
import {Card, Typography, Avatar, Tag, Form, Button, Select, Space} from 'antd';
import "../CSS/TravelogueDetail.css";
import TextArea from "antd/es/input/TextArea";
import {doGet, doJSONPut} from "../Utils/ajax";
import {resp2Json} from "../Utils/Tool";
import {Option} from "antd/es/mentions";
import {PostFailMsg, PostSuccessMsg} from "../Utils/Message";
const { Paragraph } = Typography;

const EditorAudit = () => {
    const travelogueInfoInitial = {
        Author:{Avatar: 'src/Assets/InitalAvatar.jpg'},
        Title: '西湖游记',
        views: 100,
        likes: 50,
        Content:"wait to be audited",
        PublishTime: '2023-5-16',
        Tag: [{Name:'自然风光'},{Name: '春天'}],
    };
    //定义游记信息Hook
    const  [travelogueInfo,setTravelogueInfo] = useState(travelogueInfoInitial);
    const  [id,setId] = useState(0);

    useEffect(() => {
        let tempId = window.location.search.split('=')[1];
        setId(tempId);
        const fetchData = async () => {
            try {
                const notesInfo = await doGet('/Travelogue/' + tempId);
                // console.log("notesInfo111111111" + JSON.stringify(notesInfo));
                const resp = resp2Json(notesInfo);
                // console.log("noteDetailInfo" + JSON.stringify(resp.data));
                setTravelogueInfo(resp.data);
            } catch (error) {
                console.error("Failed to fetch note:", error);
            }
        };

        fetchData();
    }, []);



    const handleAuditSubmit = async (values) => {
        // console.log(id);
        const { comment, decision } = values;
        const decisionValue =parseInt(decision);
        // 执行提交审核的逻辑，使用 comment 和 decision 的值
        // console.log('审核意见:', comment);
        // console.log('审核决策:', decisionValue);
        let resp = await doGet('/Travelogue/'+id);
        let auditId = resp.data.AuditSuggestions[0].id;
        console.log(resp.data);
        resp.data.Status = decisionValue;
        resp.data.AuditSuggestions[0].Content = comment;
        console.log(resp.data.AuditSuggestions[0]);
        let resp1 = await doJSONPut('/Travelogue/'+id, resp.data);
        let resp2 = await doJSONPut('/Audit/'+auditId, resp.data.AuditSuggestions[0])
        console.log(resp1);
        console.log(resp2);
        if(resp1.code == 0 && resp2.code == 0){
            PostSuccessMsg();
        }else {
            PostFailMsg();
        }
    };

    return (
        <div className='travelogue-details-container'>
            {/* 游记信息展示条 */}
            <Card>
                <div className="travelogue-info">
                    <div className="avatar-title">
                        <Avatar src={travelogueInfo.Author.Avatar?"src/Assets/InitalAvatar.jpg" :travelogueInfo.Author.Avatar} alt="用户头像" />
                        <h2 style={{fontSize:24}}>{travelogueInfo.Title}</h2>
                    </div>
                    <div className="stats">

                        <span>发布时间：{
                            //如果时间为空，则显示默认时间
                            travelogueInfo.PublishTime?travelogueInfo.PublishTime:'2021-01-01'
                        }</span>
                        <span>
              标签：
                            {travelogueInfo.Tag.map(tag => (
                                <Tag key={tag.Name}  color={"geekblue"}>{tag.Name}</Tag>
                            ))}
            </span>
                    </div>
                </div>
            </Card>

            {/* 游记内容展示 */}
            <Card>
                <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: '展开' }}>
                    <div style={{fontSize:20,textAlign:'left'}} dangerouslySetInnerHTML={{ __html: travelogueInfo.Content }} />
                </Paragraph>
            </Card>

            {/* 评论区 */}
            <Card>
                <div className="comments-section">
                    <h3>审核意见</h3>
                    <Form onFinish={handleAuditSubmit}>
                        <Form.Item>
                            <Form.Item name="comment" style={{ marginBottom: 0 }}>
                                <TextArea rows={4} placeholder="审核意见" />
                            </Form.Item>
                            <Space>
                                <Form.Item name="decision" style={{ marginBottom: 0 }}>
                                    <Select placeholder="请选择审核决策" >
                                        <Option value="3">通过</Option>
                                        <Option value="4">不通过</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item style={{ marginBottom: 0 }}>
                                    <Button type="primary" htmlType="submit">提交审核意见</Button>
                                </Form.Item>
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Card>


        </div>
    );
};

export default EditorAudit;
