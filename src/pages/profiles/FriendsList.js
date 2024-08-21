// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Input, Spin, Alert } from 'antd';
// import { Link, useLocation } from 'react-router-dom';
// import './FriendsList.css';
// import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
//
// const { Search } = Input;
//
// const FriendsList = () => {
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const email = query.get("email"); // Lấy email từ URL query parameters
//
//     const [searchTerm, setSearchTerm] = useState('');
//     const [friends, setFriends] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;
//
//     console.log(location)
//     useEffect(() => {
//         const fetchFriends = async () => {
//             if (!email) return; // Nếu không có email, không gửi yêu cầu API
//
//             try {
//                 const response = await axios.get(`http://localhost:8080/friends/list`, {
//                     params: { email } // Gửi email như một query parameter
//                 });
//                 setFriends(response.data);
//             } catch (err) {
//                 setError('Failed to fetch friends data. Please try again later.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//
//         fetchFriends();
//     }, [email]);
//
//     const generateProfileLink = (email) => {
//         return email === currentUserEmail ? `/profile` : `/friendsprofile?email=${email}`;
//     };
//
//     const filteredFriends = friends.filter(friend =>
//         friend.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         friend.lastName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//
//     if (loading) {
//         return <div style={{ textAlign: 'center', marginTop: 50 }}><Spin size="large" /></div>;
//     }
//
//     if (error) {
//         return <div style={{ textAlign: 'center', marginTop: 50 }}><Alert message={error} type="error" /></div>;
//     }
//
//     return (
//         <div>
//             <Search
//                 placeholder="Tìm bạn bè"
//                 onSearch={value => setSearchTerm(value)}
//                 style={{ marginBottom: 20 }}
//             />
//             <div className="friends-grid">
//                 {filteredFriends.length > 0 ? (
//                     filteredFriends.map(friend => (
//                         <div key={friend.userId} className="friend-item">
//                             <Link to={generateProfileLink(friend.email)} style={{ textDecoration: 'none' }} className="friend-link">
//                                 <img
//                                     src={decodeAndDecompressImageFile(decodeURIComponent(friend.imageAvatar)) || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"}
//                                     alt={friend.firstName + " " + friend.lastName}
//                                     className="friend-img"
//                                 />
//                             </Link>
//                             <div className="friend-name">
//                                 <Link to={generateProfileLink(friend.email)}>{friend.firstName + " " + friend.lastName}</Link>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div style={{textAlign: 'center', marginTop: 20}}>No friends found.</div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// export default FriendsList;
























import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Input, Spin, Alert, Button, List, Modal} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './FriendsList.css';
import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {Title} from "@mui/icons-material";

const { Search } = Input;

const FriendsList = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const email = query.get("email"); // Lấy email từ URL query parameters

    const [searchTerm, setSearchTerm] = useState('');
    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isViewingFriends, setIsViewingFriends] = useState(true);

    const [pendingRequests, setPendingRequests] = useState([]);



    console.log(location)
    useEffect(() => {
        const fetchFriends = async () => {
            if (!email) return; // Nếu không có email, không gửi yêu cầu API

            try {
                const response = await axios.get(`http://localhost:8080/friends/list`, {
                    params: { email } // Gửi email như một query parameter
                });
                setFriends(response.data);
            } catch (err) {
                setError('Failed to fetch friends data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchFriends();
    }, [email]);


    useEffect(() => {
        setLoading(true);
        fetchFriends();
    }, [email]);



    const fetchFriends = async () => {
        if (!email) return;

        try {
            const response = await axios.get(`http://localhost:8080/friends/list`, {
                params: { email }
            });
            setFriends(response.data.friends || []);
            setPendingRequests(response.data.pendingRequests || []);
        } catch (err) {
            setError('Failed to fetch friends data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };



    const showModal = () => setIsModalVisible(true);
    const handleClose = () => setIsModalVisible(false);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };


    const generateProfileLink = (email) => {
        return email === currentUserEmail ? `/profile` : `/friendsprofile?email=${email}`;
    };

    const filteredFriends = friends.filter(friend =>
        friend.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        friend.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="friends-container">
            <div className="friends-header">
                <Title level={4} onClick={showModal} style={{ cursor: 'pointer' }}>Bạn Bè</Title>
                {/*<Title level={5}>{friends.length} người bạn</Title>*/}
                <a onClick={showModal} className="view-all">Xem Tất Cả Bạn Bè</a>
            </div>
            <div className="friends-grid">
                {friends.slice(0, 9).map(friend => (
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
                        Bạn Bè Chung
                    </Button>
                </div>
             </Modal>
        </div>
    );
};

export default FriendsList;
