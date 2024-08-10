import React from 'react';
import {Layout, Typography, Avatar} from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import PostPage from "../posts/PostPage";
import './Profile.css'; // Import file CSS chính

const {Content} = Layout;
const {Title, Text} = Typography;

const Profile = () => {
    return (
        <Layout style={{minHeight: '100vh'}}>
            <ResponsiveAppBar/> {/* Thanh điều hướng trên cùng */}
            <Layout>
                <Layout>
                    <Content>
                        {/* Tạo div bao quanh phần banner và profile header */}
                        <div className="profile-container">
                            <div className="banner">
                                <img
                                    src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                    alt="Banner"
                                    className="banner-img"
                                />
                            </div>
                            <div className="profile-header">
                                <Avatar size={64}
                                        src="https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"/>
                                <div className="profile-info">
                                    <Title level={2}>John Doe</Title>
                                    <Text>Kỹ sư phần mềm tại XYZ</Text>
                                </div>
                            </div>
                            <div className="row">
                                <div className="profile-description">
                                    <div>Bài Viết</div>
                                    <div>Giới Thiệu</div>
                                    <div>Lượt Nhắc</div>
                                    <div>Reels</div>
                                    <div>Ảnh</div>
                                    <div>Video</div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-container">
                            <div className="content-container">
                                <div className="left-column">
                                    <Title level={4}>Giới thiệu</Title>
                                    <Text>
                                        Đây là phần giới thiệu thông tin người dùng. Bạn có thể thêm các thông tin chi
                                        tiết
                                        về bản thân, sở thích, kinh nghiệm làm việc, và nhiều hơn nữa.
                                    </Text>
                                </div>
                                <div className="right-column">
                                    <PostPage/>
                                </div>
                            </div>
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default Profile;
