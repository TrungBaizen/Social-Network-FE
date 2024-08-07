import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import './HomeLayout.css';

const { Sider } = Layout;

const onlineUsers = [
    { key: '1', name: 'Việt Hoàng' },
    { key: '2', name: 'Tùng Chùa' },
    { key: '3', name: 'Nam Rô' },
    { key: '4', name: 'Trung Béo' },
    { key: '5', name: 'Tiến Gầy' },
    { key: '6', name: 'Hải Quay Xe' },
];

const SiderRight = ({ colorBgContainer }) => (
    <Sider
        className="sider"
        style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'auto',
        }}
        width={200}
    >
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            theme="dark"
            style={{
                height: '100%',
                borderRight: 0,
            }}
            items={onlineUsers.map(user => ({
                key: user.key,
                icon: <UserOutlined style={{ color: '#52c41a' }} />,
                label: user.name,
            }))}
        />
    </Sider>
);

export default SiderRight;
