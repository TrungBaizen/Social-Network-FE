import React from 'react';
import { Layout, Typography, Avatar, Button, Divider } from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import SiderLeft from "../Layout/SiderLeft";
import SiderRight from "../Layout/SiderRight";
import PostPage from "../posts/PostPage";
import './Profile.css'; // Import file CSS

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <ResponsiveAppBar /> {/* Thanh điều hướng trên cùng */}
            <Layout>
                    <SiderLeft />
                <Layout style={{ padding: '24px', backgroundColor: '#f0f2f5' }}>
                    <Content>
                        <div className="profile-header">
                            <Avatar size={64} src="https://your-avatar-url.jpg" />
                            <div className="profile-info">
                                <Title level={2}>John Doe</Title>
                                <Text>Kỹ sư phần mềm tại XYZ</Text>
                                <Button type="primary">Chỉnh sửa hồ sơ</Button>
                            </div>
                        </div>
                        <Divider />
                        <PostPage/>
                    </Content>
                </Layout>
                    <SiderRight />
            </Layout>
        </Layout>
    );
};

export default Profile;
