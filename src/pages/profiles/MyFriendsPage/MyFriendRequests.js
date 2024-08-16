import React from 'react';
import { Button } from 'antd';
import './MyFriendRequests.css';

const MyFriendRequests = () => {
    // Dữ liệu mẫu cho lời mời kết bạn
    const friendRequests = [
        { userId: '4', firstName: 'Phạm', lastName: 'D', email: 'phamd@example.com', imageAvatar: 'https://cdn.dribbble.com/users/206362/screenshots/14453538/media/cfe80febeed64218b34e18f518ca9ae9.jpg?resize=400x300&vertical=center' },
        { userId: '5', firstName: 'Hoàng', lastName: 'E', email: 'hoange@example.com', imageAvatar: 'https://cdn.dribbble.com/users/206362/screenshots/14453538/media/cfe80febeed64218b34e18f518ca9ae9.jpg?resize=400x300&vertical=center' }
    ];

    const acceptFriendRequest = (userId) => {
        console.log(`Accepted friend request from ${userId}`);
    };

    const rejectFriendRequest = (userId) => {
        console.log(`Rejected friend request from ${userId}`);
    };

    return (
        <div className="friend-requests">
            {friendRequests.map(request => (
                <div key={request.userId} className="friend-request-item">
                    <img
                        src={request.imageAvatar || "https://default-avatar.jpg"}
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
    );
};

export default MyFriendRequests;
