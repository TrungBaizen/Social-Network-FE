import React from 'react';
import {Link} from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./NavigationMenu.css"; // Tạo file CSS riêng để tách biệt phần kiểu dáng

const pages = [
    { title: 'Trang Chủ', icon: <HomeIcon />, link: '/' },
    { title: 'Nhóm', icon: <GroupIcon />, link: '/group' },
    { title: 'Bạn Bè', icon: <AccountCircleIcon />, link: '/account' },
];

const NavigationMenu = () => {
    return (
        <div className="nav-menu">
            {pages.map((page) => (
                <Link to={page.link} className="nav-link" key={page.title}>
                    <div className="nav-item">
                        {page.icon}
                        <span>{page.title}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NavigationMenu;
