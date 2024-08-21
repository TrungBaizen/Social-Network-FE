import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './SiderRight.css'; // Import the new CSS file

const { Sider } = Layout;

const onlineUsers = [
    { key: '1', name: 'Việt Hoàng' },
    { key: '2', name: 'Tùng Chùa' },
    { key: '3', name: 'Nam Rô' },
    { key: '4', name: 'Trung Béo' },
    { key: '5', name: 'Tiến Gầy' },
    { key: '6', name: 'Hải Quay Xe' },
];

const SiderRight = () => (
    <Sider className="sider" width={200}>
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className="menu"
        >
            {onlineUsers.map(user => (
                <Menu.Item key={user.key} className="menu-item">
                    <div className="user-info">
                        <span className="online-status"/>
                        <span className="user-name">{user.name}</span>

                    </div>
                </Menu.Item>
            ))}
        </Menu>
    </Sider>
);

export default SiderRight;
