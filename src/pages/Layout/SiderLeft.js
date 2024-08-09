import React from 'react';
import { UserOutlined, TeamOutlined, ProfileOutlined, StarOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import './SiderLeft.css';

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
    // Thêm các mục khác nếu cần
];

const SiderLeft = ({ colorBgContainer }) => (
    <Sider
        className="sider"
    >
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className="menu"
            items={items2}
        />
    </Sider>
);

export default SiderLeft;
