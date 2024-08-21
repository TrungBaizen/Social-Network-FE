import React, { useState, useEffect } from 'react';
import { Typography, Modal, Input, Button, List } from 'antd';
import './MyFriendsList.css';
// import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {decodeAndDecompressImageFile} from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';

const { Title } = Typography;
const { Search } = Input;

const MyFriendsList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [isViewingFriends, setIsViewingFriends] = useState(true);
    const [friendList, setFriendList] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const profile = useSelector(({ profiles }) => profiles.profile);

    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;
    const currentUserId = JSON.parse(localStorage.getItem('currentUser')).id;

    useEffect(() => {
        // Fetch friend list from API
        const fetchFriends = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/friends/list?email=${currentUserEmail}`);
                setFriendList(response.data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [currentUserEmail]);

    useEffect(() => {
        // Fetch pending friend requests
        const fetchPendingRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/friends/pending-requests?userId=${currentUserId}`);
                setPendingRequests(response.data);
            } catch (error) {
                console.error('Error fetching pending requests:', error);
            }
        };

        fetchPendingRequests();
    }, [currentUserEmail, currentUserId]);

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

    const acceptFriendRequest = async (requestId) => {
        try {
            await axios.post(`http://localhost:8080/friends/accept-request`, null, { params: { requestId } });
            await fetchPendingRequests();
            await fetchFriends();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const rejectFriendRequest = async (requestId) => {
        try {
            await axios.post(`http://localhost:8080/friends/reject-request`, null, { params: { requestId } });
            // Refresh the list of pending requests after rejecting
            await fetchPendingRequests();
        } catch (error) {
            console.error('Error rejecting friend request:', error);
        }
    };

    const fetchFriends = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/friends/list?email=${currentUserEmail}`);
            setFriendList(response.data);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    const fetchPendingRequests = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/friends/pending-requests?userId=${currentUserId}`);
            setPendingRequests(response.data);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
        }
    };

    const generateProfileLink = (email) => {
        return email === currentUserEmail ? `/profile` : `/friendsprofile?email=${email}`;
    };

    return (
        <div className="friends-container">
            <div className="friends-header">
                <Title level={4} onClick={showModal} style={{ cursor: 'pointer' }}>Bạn Bè</Title>
                <Title level={5}>{friendList.length} người bạn</Title>
                <a onClick={showModal} className="view-all">Xem Tất Cả Bạn Bè</a>
            </div>
            <div className="friends-grid">
                {friendList.slice(0, 9).map(friend => (
                    <div key={friend.userId} className="friend-item">
                        <Link to={generateProfileLink(friend.email)} style={{ textDecoration: 'none' }} className="friend-link">
                            <img
                                src={decodeAndDecompressImageFile(decodeURIComponent(friend.imageAvatar)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                                alt={friend.firstName + " " + friend.lastName}
                                className="friend-img"
                            />
                        </Link>
                        <div className="friend-name">
                            <Link to={generateProfileLink(friend.email)} style={{ textDecoration: 'none' }} className="friend-link">
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
                                    <Link to={generateProfileLink(friend.email)} style={{ textDecoration: 'none' }} className="friend-link">
                                        <img
                                            src={decodeAndDecompressImageFile(decodeURIComponent(friend.imageAvatar)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                                            alt={friend.firstName + " " + friend.lastName}
                                            className="friend-img"
                                        />
                                    </Link>
                                    <div className="friend-name">
                                        <Link to={generateProfileLink(friend.email)} style={{ textDecoration: 'none' }} className="friend-link">
                                            {friend.firstName + " " + friend.lastName}
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="friend-requests">
                        <List
                            itemLayout="horizontal"
                            dataSource={pendingRequests}
                            renderItem={request => (
                                <List.Item
                                    actions={[
                                        <Button type="primary" onClick={() => acceptFriendRequest(request.id)}>Chấp Nhận</Button>,
                                        <Button type="default" onClick={() => rejectFriendRequest(request.id)}>Từ Chối</Button>
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={<img
                                            src={decodeAndDecompressImageFile(decodeURIComponent(request.senderImage)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                                            alt={request.senderFirstName + " " + request.senderLastName}
                                            className="friend-img"
                                        />}
                                        title={`${request.senderFirstName} ${request.senderLastName}`}
                                        description={`Email: ${request.senderEmail}`}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default MyFriendsList;





