import React, {useState} from 'react';
import {Typography, Modal, Input} from 'antd';
import './FriendsList.css';
import {useSelector} from "react-redux";

const {Title} = Typography;
const {Search} = Input;


const FriendsList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const profile = useSelector(({profiles}) => profiles.profile);
    const friendList = profile.friendList || []; // Sử dụng mảng rỗng nếu friendList là undefined
    const numberOfFriends = friendList.length;

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleSearch = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredFriends = friendList.filter(friend =>
        friend.firstName.toLowerCase().includes(searchTerm) ||
        friend.lastName.toLowerCase().includes(searchTerm)
    );

    return (
        <div className="friends-container">
            <div className="friends-header">
                <Title level={4}>Bạn Bè</Title>
                <Title level={5}>{numberOfFriends} người bạn</Title> {/* Hiển thị số lượng bạn bè */}
                <a onClick={showModal} className="view-all">Xem Tất Cả Bạn Bè</a>
            </div>
            <div className="friends-grid">
                {friendList.slice(0, 9).map(friend => (
                    <div key={friend.userId} className="friend-item">
                        <img
                            src={friend.imageAvatar || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                            alt={friend.firstName + " " + friend.lastName}
                            className="friend-img"
                        />
                        <div className="friend-name">{friend.firstName + " " + friend.lastName}</div>
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
                    style={{marginBottom: 20}}
                />
                <div className="friends-grid">
                    {filteredFriends.map(friend => (
                        <div key={friend.userId} className="friend-item">
                            <img
                                src={friend.imageAvatar || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                                alt={friend.firstName + " " + friend.lastName}
                                className="friend-img"
                            />
                            <div className="friend-name">{friend.firstName + " " + friend.lastName}</div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
};

export default FriendsList;
