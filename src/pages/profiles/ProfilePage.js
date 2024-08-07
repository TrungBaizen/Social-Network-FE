import React from 'react';
import { Layout, Card, Avatar, Typography } from 'antd';
import SiderLeft from '../Layout/SiderLeft';
import SiderRight from '../Layout/SiderRight';
import FooterComponent from '../Layout/FooterComponent';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import './ProfilePage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfilePage = () => {
    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        avatar: 'https://freenice.net/wp-content/uploads/2021/08/hinh-anh-avatar-dep.jpg',
        banner: 'https://treobangron.com.vn/wp-content/uploads/2022/09/background-dep-3-2.jpg'
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <ResponsiveAppBar />
            <Layout style={{ padding: '24px 0', backgroundColor: '#ffffff' }}>
                <SiderLeft />
                <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
                    <Content style={{ padding: 24, margin: 0 }}>
                        <div className="profile-banner" style={{ backgroundImage: `url(${user.banner})` }}>
                            <div className="profile-banner-overlay" />
                            <Avatar size={100} src={user.avatar} className="profile-avatar" />
                        </div>
                        <Card className="profile-card">
                            <Title level={2}>{user.name}</Title>
                            <Text>Email: {user.email}</Text>
                            <br />
                            <Text>Phone: {user.phone}</Text>
                            <br />
                            <Text>Address: {user.address}</Text>
                        </Card>
                    </Content>
                </Layout>
                <SiderRight />
            </Layout>
            <FooterComponent />
        </Layout>
    );
};

export default ProfilePage;
