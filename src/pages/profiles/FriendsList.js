import React from 'react';
import { Typography } from 'antd';
import './FriendsList.css';

const { Title } = Typography;

const friends = [
    { id: 1, name: 'Friend 1', imgSrc: 'friend1.jpg' },
    { id: 2, name: 'Friend 2', imgSrc: 'friend2.jpg' },
    { id: 3, name: 'Friend 3', imgSrc: 'friend3.jpg' },
    { id: 4, name: 'Friend 4', imgSrc: 'friend4.jpg' },
    { id: 5, name: 'Friend 5', imgSrc: 'friend5.jpg' },
    { id: 6, name: 'Friend 6', imgSrc: 'friend6.jpg' },
    { id: 7, name: 'Friend 7', imgSrc: 'friend7.jpg' },
    { id: 8, name: 'Friend 8', imgSrc: 'friend8.jpg' },
    { id: 9, name: 'Friend 9', imgSrc: 'friend9.jpg' },
];

const FriendsList = () => {
    return (
        <div className="friends-container">
            <div className="friends-header">
                <Title level={4}>Bạn Bè</Title>
                <Title level={5}>571 người bạn</Title>
                <a href="/friends" className="view-all">Xem Tất Cả Bạn Bè</a>
            </div>
            <div className="friends-grid">
                {friends.map(friend => (
                    <div key={friend.id} className="friend-item">
                        <img src={friend.imgSrc} alt={friend.name} className="friend-img" />
                        <div className="friend-name">{friend.name}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FriendsList;
