import React from 'react';
import {FcBusinessman, FcContacts, FcHighPriority, FcPortraitMode} from 'react-icons/fc'; // Import các biểu tượng phù hợp
import {Layout, Menu} from 'antd';
import './SiderLeft.css';

const { Sider } = Layout;

const items2 = [
    {
        key: '1',
        icon: <FcBusinessman />,
        label: 'Account',
    },
    {
        key: '2',
        icon: <FcContacts />, // Biểu tượng nhóm gần nhất
        label: 'Group',
    },
    {
        key: '3',
        icon: <FcPortraitMode />,
        label: 'Author Profile',
    },
    {
        key: '4',
        icon: <FcHighPriority />, // Biểu tượng nổi bật gần nhất
        label: 'Popular Group',
    },
    {
        key: '5',
        icon: <FcBusinessman />, // Sử dụng lại biểu tượng cho "Bạn Bè" nếu không có biểu tượng khác
        label: 'Bạn Bè',
    },
    // Thêm các mục khác nếu cần
];

const SiderLeft = ({ colorBgContainer }) => (
    <Sider className="sider">
        <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            className="menu"
            items={items2}
        />
    </Sider>
);

export default SiderLeft;
