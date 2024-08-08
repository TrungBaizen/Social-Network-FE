import React, { useState } from 'react';
import { Layout, Card, Avatar, Typography, Button, Modal, Form, Input } from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import './ProfilePage.css';

const { Content } = Layout;
const { Title, Text } = Typography;

const ProfilePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const user = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '123-456-7890',
        address: '123 Main St, Anytown, USA',
        avatar: 'https://freenice.net/wp-content/uploads/2021/08/hinh-anh-avatar-dep.jpg',
        banner: 'https://treobangron.com.vn/wp-content/uploads/2022/09/background-dep-3-2.jpg'
    };

    const handleEdit = () => {
        setIsModalVisible(true);
        form.setFieldsValue(user);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            console.log('Updated Values:', values);
            setIsModalVisible(false);
        } catch (error) {
            // Handle form validation error
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <ResponsiveAppBar />
            <Layout style={{ padding: '24px 0', backgroundColor: '#ffffff' }}>
                <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
                    <Content style={{ padding: 24, margin: 0 }}>
                        <div className="profile-banner" style={{ backgroundImage: `url(${user.banner})` }}>
                            <div className="profile-banner-overlay" />
                            <div className="profile-info">
                                <Avatar size={150} src={user.avatar} className="profile-avatar" />
                                <div className="profile-details">
                                    <Title level={2} className="profile-name">{user.name}</Title>
                                    <Text>Email: {user.email}</Text>
                                    <br />
                                    <Text>Phone: {user.phone}</Text>
                                    <br />
                                    <Text>Address: {user.address}</Text>
                                </div>
                                <Button type="primary" onClick={handleEdit} className="edit-button">Edit Profile</Button>
                            </div>
                        </div>
                        <Card className="profile-card">
                            {/* The profile card is no longer needed for user details as they are now shown in the banner */}
                        </Card>
                    </Content>
                </Layout>
            </Layout>
            <Modal
                title="Edit Profile"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Save"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item
                        name="name"
                        label="Name"
                        rules={[{ required: true, message: 'Please enter your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone"
                        rules={[{ required: true, message: 'Please enter your phone number!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="address"
                        label="Address"
                        rules={[{ required: true, message: 'Please enter your address!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default ProfilePage;
