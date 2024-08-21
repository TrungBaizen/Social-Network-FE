import React from 'react';
import {FcBusinessman, FcFilm, FcGallery, FcBookmark, FcContacts} from 'react-icons/fc'; // Nhập các biểu tượng phù hợp
import {Layout, Menu} from 'antd';
import './SiderLeft.css';

const { Sider } = Layout;

const items2 = [
    {
        key: '1',
        icon: <FcContacts />, // Biểu tượng cho "Bạn Bè"
        label: 'Bạn Bè',
    },
    {
        key: '2',
        icon: <FcGallery />, // Biểu tượng cho "Kỷ Niệm"
        label: 'Kỷ Niệm',
    },
    {
        key: '3',
        icon: <FcBookmark />, // Biểu tượng cho "Đã Lưu"
        label: 'Đã Lưu',
    },
    {
        key: '4',
        icon: <FcBusinessman />, // Biểu tượng cho "Nhóm"
        label: 'Nhóm',
    },
    {
        key: '5',
        icon: <FcFilm />, // Biểu tượng cho "Video"
        label: 'Video',
    },
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
