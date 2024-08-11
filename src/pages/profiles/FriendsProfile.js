import React, { useState } from 'react';
import { Layout, Typography, Avatar, Button } from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import PostPage from "../posts/PostPage";
import './Profile.css';
import { FavoriteBorder, HomeOutlined, PeopleOutline } from "@mui/icons-material";
import FriendsList from "./FriendsList";

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
    // Trạng thái cho các nút
    const [isFriend, setIsFriend] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFriend = () => {
        setIsFriend(!isFriend);
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <ResponsiveAppBar /> {/* Thanh điều hướng trên cùng */}
            <Layout>
                <Content>
                    <div className="profile-container">
                        <div className="banner">
                            <img
                                src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="Banner"
                                className="banner-img"
                            />
                        </div>
                        <div className="profile-header d-flex justify-content-between">
                            <div className="d-flex justify-content-start">
                                <Avatar size={64}
                                        src="https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"/>
                                <div className="profile-info">
                                    <Title level={2}>John Doe</Title>
                                    <Text>Kỹ sư phần mềm tại XYZ</Text>
                                </div>
                            </div>
                            <div className="profile-actions">
                                <Button
                                    type={isFriend ? "default" : "primary"}
                                    onClick={toggleFriend}
                                >
                                    {isFriend ? "Hủy" : "Thêm Bạn Bè"}
                                </Button>
                                <Button
                                    type={isFollowing ? "default" : "primary"}
                                    onClick={toggleFollow}
                                >
                                    {isFollowing ? "Đã Theo Dõi" : "Theo Dõi"}
                                </Button>
                            </div>
                        </div>
                        <div className="profile-section">
                            <div className="profile-navigation">
                                <div>Bài Viết</div>
                                <div>Giới Thiệu</div>
                                <div>Lượt Nhắc</div>
                                <div>Reels</div>
                                <div>Ảnh</div>
                                <div>Video</div>
                            </div>
                        </div>
                        <div className="profile-content">
                            <div className="left-column-info"> {/* Renamed class */}
                                <Title level={4}>Giới thiệu</Title>
                                <Text>
                                    Đây là phần giới thiệu thông tin người dùng. Bạn có thể thêm các thông tin chi
                                    tiết về bản thân, sở thích, kinh nghiệm làm việc, và nhiều hơn nữa.
                                </Text>
                                <div className="personal-info">
                                    <div className="info-item">
                                        <HomeOutlined className="info-icon" />
                                        <Text>Địa chỉ: Thanh Son, Vinh Phu, Vietnam</Text>
                                    </div>
                                    <div className="info-item">
                                        <PeopleOutline className="info-icon" />
                                        <Text>Số bạn bè: 9.186</Text>
                                    </div>
                                    <div className="info-item">
                                        <FavoriteBorder className="info-icon" />
                                        <Text>Tình trạng hôn nhân: Độc thân</Text>
                                    </div>
                                </div>
                                <FriendsList /> {/* Moved FriendsList component here */}
                            </div>
                            <div className="right-column">
                                <PostPage />
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;
