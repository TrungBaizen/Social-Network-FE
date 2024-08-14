import React, { useState } from 'react';
import { Typography, Modal, Input } from 'antd';
import './FriendsList.css';
import {useSelector} from "react-redux";

const { Title } = Typography;
const { Search } = Input;


const friends = [
    { id: 1, name: 'Friend 1', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 2, name: 'Friend 2', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 3, name: 'Friend 3', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 4, name: 'Friend 4', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 5, name: 'Friend 5', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 6, name: 'Friend 6', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 7, name: 'Friend 7', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 8, name: 'Friend 8', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
    { id: 9, name: 'Friend 9', imgSrc: 'https://idodesign.vn/wp-content/uploads/2023/08/logo-tra-sua-3.jpg' },
];

const FriendsList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const profile = useSelector(({profiles}) => profiles.profile);
    const friends1 = profile.friendList;
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="friends-container">
            <div className="friends-header">
                <Title level={4}>Bạn Bè</Title>
                <Title level={5}>571 người bạn</Title>
                <a onClick={showModal} className="view-all">Xem Tất Cả Bạn Bè</a>
            </div>
            <div className="friends-grid">
                {friends.map(friend => (
                    <div key={friend.id} className="friend-item">
                        <img src={friend.imgSrc} alt={friend.name} className="friend-img" />
                        <div className="friend-name">{friend.name}</div>
                    </div>
                ))}
            </div>

            <Modal
                title="Danh Sách Bạn Bè"
                visible={isModalVisible}
                onCancel={handleClose}
                footer={null}
                width={600}
            >
                <Search
                    placeholder="Tìm bạn bè"
                    onSearch={handleSearch}
                    style={{ marginBottom: 20 }}
                />
                <div className="friends-grid">
                    {filteredFriends.map(friend => (
                        <div key={friend.id} className="friend-item">
                            <img src={friend.imgSrc} alt={friend.name} className="friend-img" />
                            <div className="friend-name">{friend.name}</div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default FriendsList;
