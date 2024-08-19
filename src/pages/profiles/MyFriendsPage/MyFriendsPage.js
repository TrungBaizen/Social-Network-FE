import React, { useState } from 'react';
import { Typography, Modal, Button } from 'antd';
import MyFriendsList from './MyFriendsList';
import MyFriendRequests from './MyFriendRequests';
import './MyFriendsPage.css';

const { Title } = Typography;

const MyFriendsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewingFriends, setIsViewingFriends] = useState(true);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="friends-page">
            <Title level={2}>Danh Sách Bạn Bè</Title>
            <Button type="primary" onClick={showModal}>
                Xem Danh Sách và Lời Mời
            </Button>

            <Modal
                title="Danh Sách Bạn Bè và Lời Mời Kết Bạn"
                visible={isModalVisible}
                onCancel={handleClose}
                footer={null}
                width={800}
                className="friends-modal"
            >
                <div className="modal-nav">
                    <Button
                        type={isViewingFriends ? "primary" : "default"}
                        onClick={() => setIsViewingFriends(true)}
                    >
                        Danh Sách Bạn Bè
                    </Button>
                    <Button
                        type={!isViewingFriends ? "primary" : "default"}
                        onClick={() => setIsViewingFriends(false)}
                    >
                        Lời Mời Kết Bạn
                    </Button>
                </div>

                {isViewingFriends ? <MyFriendsList /> : <MyFriendRequests />}
            </Modal>
        </div>
    );
};

export default MyFriendsPage;
