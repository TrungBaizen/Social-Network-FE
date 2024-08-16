import React, { useState } from 'react';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import './MyFriendsList.css';

const { Search } = Input;

const MyFriendsList = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Dữ liệu mẫu cho bạn bè
    const friendList = [
        { userId: '1', firstName: 'Nguyễn', lastName: 'Văn A', email: 'nguyenvana@example.com', imageAvatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { userId: '2', firstName: 'Trần', lastName: 'Thị B', email: 'tranthib@example.com', imageAvatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { userId: '3', firstName: 'Lê', lastName: 'C', email: 'leC@example.com', imageAvatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { userId: '4', firstName: 'Phạm', lastName: 'D', email: 'phamd@example.com', imageAvatar: 'https://randomuser.me/api/portraits/men/4.jpg' },
        { userId: '5', firstName: 'Hoàng', lastName: 'E', email: 'hoange@example.com', imageAvatar: 'https://randomuser.me/api/portraits/women/5.jpg' }
    ];

    const filteredFriends = friendList.filter(friend =>
        friend.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Search
                placeholder="Tìm bạn bè"
                onSearch={value => setSearchTerm(value)}
                style={{ marginBottom: 20 }}
            />
            <div className="friends-grid">
                {filteredFriends.map(friend => (
                    <div key={friend.userId} className="friend-item">
                        <img
                            src={friend.imageAvatar || "https://randomuser.me/api/portraits/men/0.jpg"}
                            alt={friend.firstName + " " + friend.lastName}
                            className="friend-img"
                        />
                        <div className="friend-name">
                            <Link to={`/profile/${friend.email}`}>{friend.firstName + " " + friend.lastName}</Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyFriendsList;
