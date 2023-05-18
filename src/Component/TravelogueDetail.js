import React, {useState} from 'react';
import {Card, Typography, Avatar, Tag, Form, Button} from 'antd';
import {Comment} from "@ant-design/compatible";
import "../CSS/TravelogueDetail.css";
import {EyeOutline, HeartOutline} from "antd-mobile-icons";
import TextArea from "antd/es/input/TextArea";
const { Paragraph } = Typography;

const TravelogueDetails = () => {
    // 游记信息
    const travelogueInfo = {
        avatar: '                                              ',
        title: '西湖游记',
        views: 100,
        likes: 50,
        publishTime: '2023-5-16',
        tags: ['自然风光', '春天'],
    };

    // 游记内容
    const travelogueContent = '&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp库塔的交通还是非常方便的，在这里可以选择出租车、网约车（grab）或者包车。\n' +
        '\n' +
        '为了方便我们提前预定了一天包车，不得不说 巴厘岛 的包车价格真的不算贵，10个小时之内不超区的价格是200一车，我们两个人相当于人均100元。\n' +
        '\n' +
        '只需要自己规划好行程路线，确定好出发日期与时间，司机当天就会按时来接。\n' +
        '\n' +
        '当天早晨的天气非常晴朗，大朵大朵云团自在的飘在空中，此番天气总是令人雀跃。\n' +
        '\n' +
        'Pantai Tegal Beach在一座悬崖下，站在高处眺望可以看到这儿的海岸线是绵长的， 和龙 目岛一样，巴厘岛 的南部也有着许多独特的的地形'+
        'Pantai Tegal Beach的游玩受潮汐影响比较大，若是涨潮，海水会一直漫过礁石，行人几乎无从下脚，这种情况下基本上就是无法游览了。\n' +
        '\n' +
        '若是退潮，沙滩上由岩石形成的一个个凹陷处都像是天然浴缸，在这儿拍照也是很有意思的。\n' +
        '\n' +
        '时间段不同，潮汐也不同，如果想要有好的游玩体验可以提前查看潮汐表。\n' +
        '\n' +
        '值得一提的是，有时这儿的浪非常大也非常猛，在拍照游玩时一定要注意安全，带小朋友的也一定要时刻盯着他们。';

    // 评论列表
    const [comments, setComments] = useState([
        { id: 1, author: '陈昱', content: '真让人心驰神往' },
        { id: 2, author: '严寒', content: '那真是太酷啦！！！！！！！' },
    ]);
    const handleAddComment = (values) => {
        const newComment = {
            id: comments.length + 1,
            author: '用户名',
            content: values.comment,
        };
        setComments([...comments, newComment]);
    };
    return (
        <div className='travelogue-details-container'>
            {/* 游记信息展示条 */}
            <Card>
                <div className="travelogue-info">
                    <div className="avatar-title">
                        <Avatar src={travelogueInfo.avatar} alt="用户头像" />
                        <h2 style={{fontSize:24}}>{travelogueInfo.title}</h2>
                    </div>
                    <div className="stats">
                        <div>
                            <EyeOutline style={{ marginRight: 5 }}/>
                        <span>浏览量：{travelogueInfo.views}</span>
                        </div>
                        <div>
                            {/*增加爱心图标*/}
                            <HeartOutline style={{ marginRight: 5 }}/>
                            <span>点赞量：{travelogueInfo.likes}</span>
                        </div>
                        <span>发布时间：{travelogueInfo.publishTime}</span>
                        <span>
              标签：
                            {travelogueInfo.tags.map(tag => (
                                <Tag key={tag}  color={"geekblue"}>{tag}</Tag>
                            ))}
            </span>
                    </div>
                </div>
            </Card>

            {/* 游记内容展示 */}
            <Card>
                <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: '展开' }}>
                    <div style={{fontSize:20,textAlign:'left'}} dangerouslySetInnerHTML={{ __html: travelogueContent }} />
                </Paragraph>
            </Card>

            {/* 评论区 */}
            <Card>
                <div className="comments-section">
                    <h3>评论区</h3>
                    {/* 添加评论的输入框 */}
                    <Form onFinish={handleAddComment}>
                        <Form.Item name="comment">
                            <TextArea rows={4} placeholder="写下你的评论" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">提交评论</Button>
                        </Form.Item>
                    </Form>
                    {comments.map(comment => (
                        <Comment
                            key={comment.id}
                            avatar={<Avatar src={comment.avatar} alt={comment.author} />}
                            author={comment.author}
                            content={comment.content}
                        />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default TravelogueDetails;
