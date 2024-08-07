import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {logout} from "../../redux/services/userService";

const settings = [
    { title: 'Profile', link: '/profile' },
    { title: 'Account', link: '/account' },
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Change Password', link: '/changepassword' }
];

function UserMenu({ anchorElUser, handleOpenUserMenu, handleCloseUserMenu }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        // Lấy thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem("currentUser"));
        if (user) {
            // Gọi action logout với thông tin người dùng
            dispatch(logout({ email: user.email }));
        } else {
            // Nếu không có thông tin người dùng, chỉ gọi logout mà không có tham số
            dispatch(logout());
        }
        // Xóa thông tin người dùng từ localStorage
        localStorage.removeItem("currentUser");
        // Điều hướng đến trang đăng nhập
        navigate('/login');
    };


    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton
                    onClick={handleOpenUserMenu}
                    className="avatar-button"
                >
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {settings.map((setting) => (
                    <MenuItem
                        key={setting.title}
                        onClick={handleCloseUserMenu}
                        component={Link}
                        to={setting.link}
                    >
                        <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                ))}
                <MenuItem
                    onClick={() => {
                        handleCloseUserMenu(); // Đóng menu
                        handleLogout(); // Xử lý logout
                    }}
                >
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default UserMenu;
