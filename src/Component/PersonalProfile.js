// PersonalProfile.js

import React from 'react';
import './PersonalProfile.css';

const PersonalProfile = () => {
    // 用户信息数据
    const user = {
        avatar: 'user-avatar.jpg',
        username: 'John Doe',
        info: 'Travel enthusiast | Adventure seeker',
        socialMedia: '#'
    };

    // 游记概览数据
    const travelLogs = [
        {
            coverImage: 'log1-cover.jpg',
            title: '游记标题1',
            description: '游记简短描述',
            publishTime: '2023-05-01'
        },
        // 其他游记概览数据
    ];

    // 贡献图表数据
    const contributionData = [
        { name: '游记数量', value: 10 },
        { name: '评论数量', value: 20 },
        // 其他贡献指标数据
    ];

    return (
        <div className="container">
            <div className="left-column">
                <div className="user-info">
                    <img src={user.avatar} alt="User Avatar" className="avatar" />
                    <h2 className="username">{user.username}</h2>
                    <p className="info">{user.info}</p>
                    {user.socialMedia && (
                        <a href={user.socialMedia} className="social-media-link">Social Media</a>
                    )}
                </div>
            </div>
            <div className="right-column">
                <div className="travel-logs">
                    <h3>游记概览</h3>
                    <ul className="log-list">
                        {travelLogs.map((log, index) => (
                            <li key={index} className="log-item">
                                <img src={log.coverImage} alt="Log Cover" className="log-cover" />
                                <div className="log-details">
                                    <h4 className="log-title">{log.title}</h4>
                                    <p className="log-description">{log.description}</p>
                                    <span className="publish-time">发布时间：{log.publishTime}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="contribution-chart">
                    <h3>贡献图表</h3>
                    <div className="chart-container">
                        {/* 在这里使用柱状图、折线图或其他可视化方式展示贡献情况 */}
                        {contributionData.map((data, index) => (
                            <div key={index} className="contribution-item">
                                <span className="contribution-label">{data.name}:</span>
                                <span className="contribution-value">{data.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalProfile;
