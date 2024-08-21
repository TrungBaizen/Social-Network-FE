
// import React, { useEffect, useState } from 'react';
// import { Avatar, Button, Layout, Typography, Dropdown, Menu, message } from 'antd';
// import { DownOutlined } from '@ant-design/icons';
// import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
// import './FriendsProfile.css';
// import { useDispatch, useSelector } from "react-redux";
// import { getProfile } from "../../redux/services/profileService";
// import { useLocation } from "react-router-dom";
// import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
// import { CalendarOutlined, EnvironmentOutlined, ManOutlined, ToolOutlined, WomanOutlined } from "@ant-design/icons";
// import axios from 'axios';
// import FriendsProfile from "./FriendsProfile/FriendsProfile";
// import FriendsList from "./FriendsList";
//
// const { Content } = Layout;
// const { Title, Text } = Typography;
//
// const Profile = () => {
//     const [isFriend, setIsFriend] = useState(false);
//     const [isFollowing, setIsFollowing] = useState(false);
//     const [isRequestSent, setIsRequestSent] = useState(false);
//     const location = useLocation();
//     const query = new URLSearchParams(location.search);
//     const email = query.get("email");
//     const dispatch = useDispatch();
//     const profile = useSelector(({ profiles }) => profiles.profile);
//     const [imageCover, setImageCover] = useState('');
//     const [avatarImage, setAvatarImage] = useState('');
//     const currentUserId = JSON.parse(localStorage.getItem('currentUser'))?.id;
//     const [profileUserId, setProfileUserId] = useState(null);
//     const [hasReceivedRequest, setHasReceivedRequest] = useState(false);
//     const [pendingRequests, setPendingRequests] = useState([]);
//
//     useEffect(() => {
//         if (profileUserId && currentUserId) {
//             const checkRequestStatus = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:8080/friends/has-sent-request', {
//                         params: {
//                             senderId: profileUserId,
//                             receiverId: currentUserId
//                         }
//                     });
//                     console.log('setHasReceivedRequest', response.data);
//                     setHasReceivedRequest(response.data);
//                 } catch (error) {
//                     console.error('Error checking if request has been sent:', error);
//                 }
//             };
//
//             checkRequestStatus();
//
//             const fetchPendingRequests = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:8080/friends/pending-requests', {
//                         params: { userId: currentUserId }
//                     });
//                     console.log('setPendingRequests', response.data);
//                     setPendingRequests(response.data);
//                 } catch (error) {
//                     console.error('Error fetching pending requests:', error);
//                 }
//             };
//
//             fetchPendingRequests();
//         }
//     }, [profileUserId, currentUserId]);
//
//
//
//     useEffect(() => {
//         dispatch(getProfile(email));
//     }, [dispatch, email]);
//
//     useEffect(() => {
//         if (profileUserId && currentUserId) {
//             const checkFriendshipStatus = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:8080/friends/check-friendship', {
//                         params: {
//                             senderId: currentUserId,
//                             receiverId: profileUserId
//                         }
//                     });
//                     setIsFriend(response.data);
//                 } catch (error) {
//                     console.error('Error checking friendship:', error);
//                 }
//             };
//
//             checkFriendshipStatus();
//         }
//     }, [profileUserId, currentUserId]);
//
//     useEffect(() => {
//         if (profileUserId && currentUserId) {
//             const checkFollowStatus = async () => {
//                 try {
//                     const response = await axios.get('http://localhost:8080/friends/check-follow', {
//                         params: {
//                             userId: currentUserId,
//                             friendUserId: profileUserId
//                         }
//                     });
//                     setIsFollowing(response.data);
//                 } catch (error) {
//                     console.error('Error checking follow status:', error);
//                 }
//             };
//
//             checkFollowStatus();
//         }
//     }, [profileUserId, currentUserId]);
//
//     useEffect(() => {
//         const fetchImage = async () => {
//             try {
//                 if (profile.imageCover) {
//                     const decodeURL = decodeURIComponent(profile.imageCover);
//                     const imageUrl = await decodeAndDecompressImageFile(decodeURL);
//                     setImageCover(imageUrl);
//                 } else {
//                     setImageCover("https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
//                 }
//
//                 if (profile.imageAvatar) {
//                     const decodeURL = decodeURIComponent(profile.imageAvatar);
//                     const imageUrl = await decodeAndDecompressImageFile(decodeURL);
//                     setAvatarImage(imageUrl);
//                 } else {
//                     setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
//                 }
//             } catch (error) {
//                 console.error('Error decoding image:', error);
//             }
//         };
//
//         if (profile) {
//             fetchImage();
//             setProfileUserId(profile.userId);
//         }
//     }, [profile]);
//
//     const handleAddFriend = async () => {
//         if (profileUserId && currentUserId) {
//             try {
//                 await axios.post(`http://localhost:8080/friends/send-request`, null, {
//                     params: {
//                         senderId: currentUserId,
//                         receiverId: profileUserId
//                     }
//                 });
//                 setIsFriend(true);
//                 setIsRequestSent(true);
//                 setIsFollowing(true);
//                 message.success('Gửi lời mời kết bạn thành công');
//             } catch (error) {
//                 console.error('Error sending friend request:', error);
//             }
//         } else {
//             console.error('User IDs are not defined');
//         }
//     };
//
//     const handleUnfriend = async () => {
//         if (profileUserId && currentUserId) {
//             try {
//                 await axios.delete('http://localhost:8080/friends/unfriend', {
//                     params: {
//                         userId: currentUserId,
//                         friendId: profileUserId
//                     }
//                 });
//                 setIsFriend(false);
//                 setIsRequestSent(false);
//                 setIsFollowing(false);
//                 message.success('Hủy kết bạn thành công!');
//             } catch (error) {
//                 console.error('Error unfriending user:', error);
//             }
//         } else {
//             console.error('User IDs are not defined');
//         }
//     };
//
//     const handleFollow = async () => {
//         if (profileUserId && currentUserId) {
//             try {
//                 if (isFollowing) {
//                     console.log('Already following');
//                     return;
//                 }
//
//                 await axios.post('http://localhost:8080/friends/follow', null, {
//                     params: {
//                         userId: currentUserId,
//                         friendUserId: profileUserId
//                     }
//                 });
//
//                 setIsFollowing(true);
//                 message.success('Đang theo dõi người dùng');
//             } catch (error) {
//                 console.error('Error following user:', error);
//             }
//         } else {
//             console.error('User IDs are not defined');
//         }
//     };
//
//     const handleCancelRequest = async () => {
//         if (profileUserId && currentUserId) {
//             try {
//                 await axios.delete('http://localhost:8080/friends/cancel-request', {
//                     params: {
//                         senderId: currentUserId,
//                         receiverId: profileUserId
//                     }
//                 });
//                 setIsRequestSent(false);
//                 setIsFriend(false);
//                 setIsFollowing(false);
//                 message.success('Hủy yêu cầu kết bạn thành công!');
//             } catch (error) {
//                 console.error('Error canceling friend request:', error);
//             }
//         } else {
//             console.error('User IDs are not defined');
//         }
//     };
//
//
//     const handleUnfollow = async () => {
//         if (profileUserId && currentUserId) {
//             try {
//                 await axios.delete('http://localhost:8080/friends/unfollow', {
//                     params: {
//                         userId: currentUserId,
//                         followedId: profileUserId
//                     }
//                 });
//                 setIsFollowing(false);
//                 message.success('Hủy theo dõi người dùng thành công!');
//             } catch (error) {
//                 console.error('Error unfollowing user:', error);
//             }
//         } else {
//             console.error('User IDs are not defined');
//         }
//     };
//
//     const acceptFriendRequest = async (requestId) => {
//         try {
//             const response = await axios.post('http://localhost:8080/friends/accept-request?requestId=' + requestId);
//             console.log('Request accepted successfully:', response.data);
//         } catch (error) {
//             console.error('Error accepting friend request:', error.response?.data || error.message);
//         }
//     };
//
//     const rejectFriendRequest = async (requestId) => {
//         try {
//             const response = await axios.post('http://localhost:8080/friends/reject-request', {
//                 params: {
//                     requestId: requestId
//                 }
//             });
//             console.log('Request rejected successfully:', response.data);
//         } catch (error) {
//             console.error('Error rejecting friend request:', error.response?.data || error.message);
//         }
//     };
//
//
//
//     const followMenu = (
//         <Menu>
//             <Menu.Item onClick={handleUnfollow}>
//                 Bỏ theo dõi
//             </Menu.Item>
//         </Menu>
//     );
//
//     const unfriendMenu = (
//         <Menu>
//             <Menu.Item onClick={handleUnfriend}>
//                 Hủy kết bạn
//             </Menu.Item>
//         </Menu>
//     );
//
//
//
//     const requestMenu = (requestId) => (
//         <Menu>
//             <Menu.Item onClick={() => acceptFriendRequest(requestId)}>
//                 Đồng Ý
//             </Menu.Item>
//             <Menu.Item onClick={() => rejectFriendRequest(requestId)}>
//                 Từ Chối
//             </Menu.Item>
//         </Menu>
//     );
//
//     return (
//         <Layout style={{ minHeight: '100vh' }}>
//             <ResponsiveAppBar />
//             <Layout>
//                 <Content>
//                     <div className="profile-container">
//                         <div className="banner">
//                             <img
//                                 src={imageCover}
//                                 alt="Banner"
//                                 className="banner-img"
//                             />
//                         </div>
//                         <div className="profile-header d-flex justify-content-between">
//                             <div className="d-flex justify-content-start">
//                                 <Avatar size={64} src={avatarImage} />
//                                 <div className="profile-info">
//                                     <Title level={2}>{profile.firstName} {profile.lastName}</Title>
//                                 </div>
//                             </div>
//                             <div className="profile-actions d-flex align-items-center">
//                                 <div className="friend-action me-2">
//                                     {hasReceivedRequest ? (
//                                         <Dropdown overlay={requestMenu(pendingRequests && pendingRequests.length > 0 ? pendingRequests[0].id : null)} trigger={['click']}>
//                                             <Button type="default">
//                                                 Phản hồi yêu cầu <DownOutlined/>
//                                             </Button>
//                                         </Dropdown>
//                                     ) : isRequestSent ? (
//                                         <Button
//                                             type="default"
//                                             onClick={handleCancelRequest}
//                                         >
//                                             Hủy Yêu Cầu
//                                         </Button>
//                                     ) : isFriend ? (
//                                         <Dropdown overlay={unfriendMenu} trigger={['click']}>
//                                             <Button type="default">
//                                                 Bạn Bè <DownOutlined/>
//                                             </Button>
//                                         </Dropdown>
//                                     ) : (
//                                         <Button
//                                             type="primary"
//                                             onClick={handleAddFriend}
//                                         >
//                                             Thêm Bạn Bè
//                                         </Button>
//                                     )}
//                                 </div>
//
//                                 <div className="follow-action">
//                                     {isFollowing ? (
//                                         <Dropdown overlay={followMenu} trigger={['click']}>
//                                             <Button type="default">
//                                                 Đang Theo Dõi <DownOutlined/>
//                                             </Button>
//                                         </Dropdown>
//                                     ) : (
//                                         <Button
//                                             type="primary"
//                                             onClick={handleFollow}
//                                         >
//                                             Theo Dõi
//                                         </Button>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//
//                     <div className="profile-content">
//                         <div className="left-column-info">
//                             <Title level={4}>Giới thiệu</Title>
//                             {profile.description && (
//                                 <Text>
//                                     {profile.description}
//                                 </Text>
//                             )}
//                             <div className="personal-info">
//                                 <div className="info-item">
//                                     {profile.birthDate && (
//                                         <>
//                                             <CalendarOutlined className="info-icon"/>
//                                             <Text>{new Date(profile.birthDate).toLocaleDateString('vi-VN')}</Text>
//                                         </>
//                                     )}
//                                 </div>
//                                 <div className="info-item">
//                                     <EnvironmentOutlined className="info-icon" />
//                                     <Text>{profile.address}</Text>
//                                 </div>
//                                 <div className="info-item">
//                                     {profile.gender === 'male' ? <ManOutlined className="info-icon" /> :
//                                         <WomanOutlined className="info-icon" />}
//                                     <Text>{profile.gender === 'male' ? 'Nam' : 'Nữ'}</Text>
//                                 </div>
//                                 <div className="info-item">
//                                     <ToolOutlined className="info-icon" />
//                                     <Text>{profile.occupation}</Text>
//                                 </div>
//                                 <FriendsList/>
//                             </div>
//                         </div>
//                         <FriendsProfile/>
//                     </div>
//
//                 </Content>
//             </Layout>
//         </Layout>
//     );
//
// };
//
// export default Profile;
//










import React, { useEffect, useState } from 'react';
import { Avatar, Button, Layout, Typography, Dropdown, Menu, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import './FriendsProfile.css';
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../redux/services/profileService";
import { useLocation } from "react-router-dom";
import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import { CalendarOutlined, EnvironmentOutlined, ManOutlined, ToolOutlined, WomanOutlined } from "@ant-design/icons";
import axios from 'axios';
import FriendsProfile from "./FriendsProfile/FriendsProfile";
import FriendsList from "./FriendsList";

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
    const [isFriend, setIsFriend] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [isRequestSent, setIsRequestSent] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const email = query.get("email");
    const dispatch = useDispatch();
    const profile = useSelector(({ profiles }) => profiles.profile);
    const [imageCover, setImageCover] = useState('');
    const [avatarImage, setAvatarImage] = useState('');
    const currentUserId = JSON.parse(localStorage.getItem('currentUser'))?.id;
    const [profileUserId, setProfileUserId] = useState(null);
    const [hasReceivedRequest, setHasReceivedRequest] = useState(false);
    const [pendingRequests, setPendingRequests] = useState([]);



    useEffect(() => {
          if (profileUserId && currentUserId) {
            const checkRequestStatus = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/friends/has-sent-request', {
                        params: {
                            senderId: profileUserId,
                            receiverId: currentUserId
                        }
                    });
                    console.log('setHasReceivedRequest', response.data);
                    setHasReceivedRequest(response.data);
                } catch (error) {
                    console.error('Error checking if request has been sent:', error);
                }
            };

            checkRequestStatus();

            const fetchPendingRequests = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/friends/pending-requests', {
                        params: { userId: currentUserId }
                    });
                    console.log('setPendingRequests', response.data);
                    setPendingRequests(response.data);
                } catch (error) {
                    console.error('Error fetching pending requests:', error);
                }
            };

            fetchPendingRequests();
        }
    }, [profileUserId, currentUserId]);



    useEffect(() => {
        dispatch(getProfile(email));
    }, [dispatch, email]);

    useEffect(() => {
        if (profileUserId && currentUserId) {
            const checkFriendshipStatus = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/friends/check-friendship', {
                        params: {
                            senderId: currentUserId,
                            receiverId: profileUserId
                        }
                    });
                    setIsFriend(response.data);
                } catch (error) {
                    console.error('Error checking friendship:', error);
                }
            };

            checkFriendshipStatus();
        }
    }, [profileUserId, currentUserId]);

    useEffect(() => {
        if (profileUserId && currentUserId) {
            const checkFollowStatus = async () => {
                try {
                    const response = await axios.get('http://localhost:8080/friends/check-follow', {
                        params: {
                            userId: currentUserId,
                            friendUserId: profileUserId
                        }
                    });
                    setIsFollowing(response.data);
                } catch (error) {
                    console.error('Error checking follow status:', error);
                }
            };

            checkFollowStatus();
        }
    }, [profileUserId, currentUserId]);

    useEffect(() => {
         const fetchImage = async () => {
            try {
                if (profile.imageCover) {
                    const decodeURL = decodeURIComponent(profile.imageCover);
                    const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                    setImageCover(imageUrl);
                } else {
                    setImageCover("https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
                }

                if (profile.imageAvatar) {
                    const decodeURL = decodeURIComponent(profile.imageAvatar);
                    const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                    setAvatarImage(imageUrl);
                } else {
                    setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
                }
            } catch (error) {
                console.error('Error decoding image:', error);
            }
        };

        if (profile) {
            fetchImage();
            setProfileUserId(profile.userId);
        }
    }, [profile]);

    const handleAddFriend = async () => {
        if (profileUserId && currentUserId) {
            try {
                await axios.post(`http://localhost:8080/friends/send-request`, null, {
                    params: {
                        senderId: currentUserId,
                        receiverId: profileUserId
                    }
                });
                setIsFriend(true);
                setIsRequestSent(true);
                setIsFollowing(true);
                message.success('Gửi lời mời kết bạn thành công');
            } catch (error) {
                console.error('Error sending friend request:', error);
            }
        } else {
            console.error('User IDs are not defined');
        }
    };

    const handleUnfriend = async () => {
        if (profileUserId && currentUserId) {
            try {
                await axios.delete('http://localhost:8080/friends/unfriend', {
                    params: {
                        userId: currentUserId,
                        friendId: profileUserId
                    }
                });
                setIsFriend(false);
                setIsRequestSent(false);
                setIsFollowing(false);
                message.success('Hủy kết bạn thành công!');
            } catch (error) {
                console.error('Error unfriending user:', error);
            }
        } else {
            console.error('User IDs are not defined');
        }
    };

    const handleFollow = async () => {
        if (profileUserId && currentUserId) {
            try {
                if (isFollowing) {
                    console.log('Already following');
                    return;
                }

                await axios.post('http://localhost:8080/friends/follow', null, {
                    params: {
                        userId: currentUserId,
                        friendUserId: profileUserId
                    }
                });

                setIsFollowing(true);
                message.success('Đang theo dõi người dùng');
            } catch (error) {
                console.error('Error following user:', error);
            }
        } else {
            console.error('User IDs are not defined');
        }
    };

    const handleCancelRequest = async () => {
        if (profileUserId && currentUserId) {
            try {
                await axios.delete('http://localhost:8080/friends/cancel-request', {
                    params: {
                        senderId: currentUserId,
                        receiverId: profileUserId
                    }
                });
                setIsRequestSent(false);
                setIsFriend(false);
                setIsFollowing(false);
                message.success('Hủy yêu cầu kết bạn thành công!');
            } catch (error) {
                console.error('Error canceling friend request:', error);
            }
        } else {
            console.error('User IDs are not defined');
        }
    };


    const handleUnfollow = async () => {
        if (profileUserId && currentUserId) {
            try {
                await axios.delete('http://localhost:8080/friends/unfollow', {
                    params: {
                        userId: currentUserId,
                        followedId: profileUserId
                    }
                });
                setIsFollowing(false);
                message.success('Hủy theo dõi người dùng thành công!');
            } catch (error) {
                console.error('Error unfollowing user:', error);
            }
        } else {
            console.error('User IDs are not defined');
        }
    };

    const acceptFriendRequest = async (requestId) => {
        try {
            const response = await axios.post('http://localhost:8080/friends/accept-request?requestId=' + requestId);
            console.log('Request accepted successfully:', response.data);
        } catch (error) {
            console.error('Error accepting friend request:', error.response?.data || error.message);
        }
    };

    const rejectFriendRequest = async (requestId) => {
        try {
            const response = await axios.post('http://localhost:8080/friends/reject-request', {
                params: {
                    requestId: requestId
                }
            });
            console.log('Request rejected successfully:', response.data);
        } catch (error) {
            console.error('Error rejecting friend request:', error.response?.data || error.message);
        }
    };



    const followMenu = (
        <Menu>
            <Menu.Item onClick={handleUnfollow}>
                Bỏ theo dõi
            </Menu.Item>
        </Menu>
    );

    const unfriendMenu = (
        <Menu>
            <Menu.Item onClick={handleUnfriend}>
                Hủy kết bạn
            </Menu.Item>
        </Menu>
    );



    const requestMenu = (requestId) => (
        <Menu>
            <Menu.Item onClick={() => acceptFriendRequest(requestId)}>
                Đồng Ý
            </Menu.Item>
            <Menu.Item onClick={() => rejectFriendRequest(requestId)}>
                Từ Chối
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <ResponsiveAppBar />
            <Layout>
                <Content>
                    <div className="profile-container">
                        <div className="banner">
                            <img
                                src={imageCover}
                                alt="Banner"
                                className="banner-img"
                            />
                        </div>
                        <div className="profile-header d-flex justify-content-between">
                            <div className="d-flex justify-content-start">
                                <Avatar size={64} src={avatarImage} />
                                <div className="profile-info">
                                    <Title level={2}>{profile.firstName} {profile.lastName}</Title>
                                </div>
                            </div>
                            <div className="profile-actions d-flex align-items-center">
                                <div className="friend-action me-2">
                                    {hasReceivedRequest ? (
                                        <Dropdown overlay={requestMenu(pendingRequests && pendingRequests.length > 0 ? pendingRequests[0].id : null)} trigger={['click']}>
                                            <Button type="default">
                                                Phản hồi yêu cầu <DownOutlined/>
                                            </Button>
                                        </Dropdown>
                                    ) : isRequestSent ? (
                                        <Button
                                            type="default"
                                            onClick={handleCancelRequest}
                                        >
                                            Hủy Yêu Cầu
                                        </Button>
                                    ) : isFriend ? (
                                        <Dropdown overlay={unfriendMenu} trigger={['click']}>
                                            <Button type="default">
                                                Bạn Bè <DownOutlined/>
                                            </Button>
                                        </Dropdown>
                                    ) : (
                                        <Button
                                            type="primary"
                                            onClick={handleAddFriend}
                                        >
                                            Thêm Bạn Bè
                                        </Button>
                                    )}
                                </div>

                                <div className="follow-action">
                                    {isFollowing ? (
                                        <Dropdown overlay={followMenu} trigger={['click']}>
                                            <Button type="default">
                                                Đang Theo Dõi <DownOutlined/>
                                            </Button>
                                        </Dropdown>
                                    ) : (
                                        <Button
                                            type="primary"
                                            onClick={handleFollow}
                                        >
                                            Theo Dõi
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-content">
                        <div className="left-column-info">
                            <Title level={4}>Giới thiệu</Title>
                            {profile.description && (
                                <Text>
                                    {profile.description}
                                </Text>
                            )}
                            <div className="personal-info">
                                <div className="info-item">
                                    {profile.birthDate && (
                                        <>
                                            <CalendarOutlined className="info-icon"/>
                                            <Text>{new Date(profile.birthDate).toLocaleDateString('vi-VN')}</Text>
                                        </>
                                    )}
                                </div>
                                <div className="info-item">
                                    <EnvironmentOutlined className="info-icon" />
                                    <Text>{profile.address}</Text>
                                </div>
                                <div className="info-item">
                                    {profile.gender === 'male' ? <ManOutlined className="info-icon" /> :
                                        <WomanOutlined className="info-icon" />}
                                    <Text>{profile.gender === 'male' ? 'Nam' : 'Nữ'}</Text>
                                </div>
                                <div className="info-item">
                                    <ToolOutlined className="info-icon" />
                                    <Text>{profile.occupation}</Text>
                                </div>
                                <FriendsList/>
                            </div>
                        </div>
                        <FriendsProfile/>
                    </div>

                </Content>
            </Layout>
        </Layout>
    );

};

export default Profile;
