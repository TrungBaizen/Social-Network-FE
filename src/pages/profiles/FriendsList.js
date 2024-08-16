import React, { useState } from 'react';
import { Typography, Modal, Input, Button } from 'antd';
import './FriendsList.css';
import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import { Link } from "react-router-dom";

const { Title } = Typography;
const { Search } = Input;

const FriendsList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewingFriends, setIsViewingFriends] = useState(true);

    // Dữ liệu mẫu cho bạn bè và lời mời kết bạn
    const friendList = [
        {
            userId: '1',
            firstName: 'Nguyễn',
            lastName: 'Văn A',
            email: 'nguyenvana@example.com',
            imageAvatar: 'path/to/avatar1.jpg'
        },
        {
            userId: '2',
            firstName: 'Trần',
            lastName: 'Thị B',
            email: 'tranthib@example.com',
            imageAvatar: 'path/to/avatar2.jpg'
        },
        {
            userId: '3',
            firstName: 'Lê',
            lastName: 'C',
            email: 'leC@example.com',
            imageAvatar: 'path/to/avatar3.jpg'
        },
    ];

    const friendRequests = [
        {
            userId: '4',
            firstName: 'Phạm',
            lastName: 'D',
            email: 'phamd@example.com',
            imageAvatar: 'path/to/avatar4.jpg'
        },
        {
            userId: '5',
            firstName: 'Hoàng',
            lastName: 'E',
            email: 'hoange@example.com',
            imageAvatar: 'path/to/avatar5.jpg'
        }
    ];

    const numberOfFriends = friendList.length;

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
        setIsViewingFriends(true);
    };

    const handleSearch = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    const filteredFriends = friendList.filter(friend =>
        friend.firstName.toLowerCase().includes(searchTerm) ||
        friend.lastName.toLowerCase().includes(searchTerm)
    );

    const acceptFriendRequest = (userId) => {
        console.log(`Accepted friend request from ${userId}`);
    };

    const rejectFriendRequest = (userId) => {
        console.log(`Rejected friend request from ${userId}`);
    };

    return (
        <div className="friends-container">
            <div className="friends-header">
                <Title level={4} onClick={showModal} style={{ cursor: 'pointer' }}>Bạn Bè</Title>
                <Title level={5}>{numberOfFriends} người bạn</Title>
                <a onClick={showModal} className="view-all">Xem Tất Cả Bạn Bè</a>
            </div>
            <div className="friends-grid">
                {friendList.slice(0, 3).map(friend => (
                    <div key={friend.userId} className="friend-item">
                        <img
                            src={decodeAndDecompressImageFile(decodeURIComponent(friend.imageAvatar)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                            alt={friend.firstName + " " + friend.lastName}
                            className="friend-img"
                        />
                        <div className="friend-name">
                            <Link to={`/friendsprofile?email=${friend.email}`} className="friend-name">
                                {friend.firstName + " " + friend.lastName}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            <Modal
                title="Bạn Bè"
                visible={isModalVisible}
                onCancel={handleClose}
                footer={null}
                width={600}
            >
                <div className="modal-nav">
                    <Button type={isViewingFriends ? "primary" : "default"} onClick={() => setIsViewingFriends(true)}>
                        Danh Sách Bạn Bè
                    </Button>
                    <Button type={!isViewingFriends ? "primary" : "default"} onClick={() => setIsViewingFriends(false)}>
                        Xác Nhận Lời Mời
                    </Button>
                </div>

                {isViewingFriends ? (
                    <>
                        <Search
                            placeholder="Tìm bạn bè"
                            onSearch={handleSearch}
                            style={{ marginBottom: 20 }}
                        />
                        <div className="friends-grid">
                            {filteredFriends.map(friend => (
                                <div key={friend.userId} className="friend-item">
                                    <img
                                        src={decodeAndDecompressImageFile(decodeURIComponent(friend.imageAvatar)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                                        alt={friend.firstName + " " + friend.lastName}
                                        className="friend-img"
                                    />
                                    <div className="friend-name">
                                        <Link to={`/friendsprofile?email=${friend.email}`} className="friend-name">
                                            {friend.firstName + " " + friend.lastName}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="friend-requests">
                        {friendRequests.map(request => (
                            <div key={request.userId} className="friend-request-item">
                                <img
                                    src={decodeAndDecompressImageFile(decodeURIComponent(request.imageAvatar)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                                    alt={request.firstName + " " + request.lastName}
                                    className="friend-img"
                                />
                                <div className="friend-name">
                                    {request.firstName + " " + request.lastName}
                                </div>
                                <div className="friend-request-actions">
                                    <Button type="primary" onClick={() => acceptFriendRequest(request.userId)}>Chấp nhận</Button>
                                    <Button type="default" onClick={() => rejectFriendRequest(request.userId)}>Từ chối</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default FriendsList;
