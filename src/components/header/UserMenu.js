import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../redux/services/userService';
import './UserMenu.css';


function UserMenu({ anchorElUser, handleOpenUserMenu, handleCloseUserMenu }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [settings, setSettings] = useState([]);
    useEffect(() => {
        const newSettings  = [
            { title: 'Profile', link: `/profile` },
            { title: 'Account', link: '/account' },
            { title: 'Dashboard', link: '/dashboard' },
            { title: 'Change Password', link: '/changepassword' }
        ];
        setSettings(newSettings)
    }, []);
    const handleLogout = () => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        dispatch(logout(user ? { email: user.email } : {}));
        localStorage.removeItem('currentUser');
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton
                    onClick={handleOpenUserMenu}
                    className="avatar-button"
                >
                    <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
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
                        className="menu-item"
                    >
                        <Typography textAlign="center">{setting.title}</Typography>
                    </MenuItem>
                ))}
                <MenuItem
                    onClick={() => {
                        handleCloseUserMenu();
                        handleLogout();
                    }}
                    className="logout-item"
                >
                    <Typography textAlign="center">Logout</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default UserMenu;
