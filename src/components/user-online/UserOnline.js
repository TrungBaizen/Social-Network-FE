// UserOnline.js
import React from 'react';
import { Badge } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Layout } from 'antd';

const { Sider } = Layout;

const onlineUsers = [
    { key: '1', name: 'Việt Hoàng' },
    { key: '2', name: 'Tùng Chùa' },
    { key: '3', name: 'Nam Rô' },
    { key: '4', name: 'Trung Béo' },
    { key: '5', name: 'Tiến Gầy' },
    { key: '6', name: 'Hải Quay Xe' },
];

const UserOnline = ({ collapsed, onCollapse }) => {
    const items = onlineUsers.map(user => ({
        key: user.key,
        icon: (
            <Badge
                dot
                status="success"
                offset={[0, 10]}
                style={{ backgroundColor: '#52c41a' }}
            >
                <UserOutlined />
            </Badge>
        ),
        label: user.name,
    }));

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} style={{ background: '#fff' }}>
            <div className="demo-logo-vertical" />
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline" items={items} />
        </Sider>
    );
};

export default UserOnline;
