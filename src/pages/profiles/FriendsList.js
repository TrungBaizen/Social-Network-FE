import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Spin, Alert } from 'antd';
import { Link, useParams } from 'react-router-dom';
import './FriendsList.css';
import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";

const { Search } = Input;

const FriendsList = () => {
    const { email } = useParams(); // Sử dụng email từ URL parameters
    const [searchTerm, setSearchTerm] = useState('');
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;

    useEffect(() => {
        const fetchFriends = async () => {
            if (!email) return; // Nếu không có email, không gửi yêu cầu API

            try {
                const response = await axios.get(`http://localhost:8080/friends/list?email=${email}`);
                setFriends(response.data);
            } catch (err) {
                setError('Failed to fetch friends data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchFriends();
    }, [email]); // Thay đổi email sẽ gọi lại useEffect

    const generateProfileLink = (email) => {
        return email === currentUserEmail ? `/profile` : `/friendsprofile?email=${email}`;
    };

    const filteredFriends = friends.filter(friend =>
        friend.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: 50 }}><Alert message={error} type="error" /></div>;
    }

    return (
        <div>
            <Search
                placeholder="Tìm bạn bè"
                onSearch={value => setSearchTerm(value)}
                style={{ marginBottom: 20 }}
            />
            <div className="friends-grid">
                {filteredFriends.length > 0 ? (
                    filteredFriends.map(friend => (
                        <div key={friend.userId} className="friend-item">
                            <Link to={generateProfileLink(friend.email)} style={{ textDecoration: 'none' }} className="friend-link">
                                <img
                                    src={decodeAndDecompressImageFile(decodeURIComponent(friend.imageAvatar)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
                                    alt={friend.firstName + " " + friend.lastName}
                                    className="friend-img"
                                />
                            </Link>
                            <div className="friend-name">
                                <Link to={generateProfileLink(friend.email)}>{friend.firstName + " " + friend.lastName}</Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{textAlign: 'center', marginTop: 20}}>No friends found.</div>
                )}
            </div>
        </div>
    );
};

export default FriendsList;
