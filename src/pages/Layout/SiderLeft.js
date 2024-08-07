import React from 'react';
import { UserOutlined, TeamOutlined, ProfileOutlined, StarOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './HomeLayout.css';

const { Sider } = Layout;

const items2 = [
    {
        key: '1',
        icon: <UserOutlined />,
        label: 'Account',
    },
    {
        key: '2',
        icon: <TeamOutlined />,
        label: 'Group',
    },
    {
        key: '3',
        icon: <ProfileOutlined />,
        label: 'Author Profile',
    },
    {
        key: '4',
        icon: <StarOutlined />,
        label: 'Popular Group',
    },
    // Add more items if needed
];

const SiderLeft = ({ colorBgContainer }) => (
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
            style={{
                height: '100%',
                borderRight: 0,
            }}
            items={items2}
        />
    </Sider>
);

export default SiderLeft;
