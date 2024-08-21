import React, { useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './NotificationIcons.css';

function NotificationIcons() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]); // Dữ liệu thông báo mô phỏng
    const [messages, setMessages] = useState([]); // Dữ liệu tin nhắn mô phỏng

    const handleClickNotifications = (event) => {
        setAnchorEl(event.currentTarget);
        // Lấy thông báo nếu cần
    };

    const handleClickMessages = (event) => {
        setAnchorEl(event.currentTarget);
        // Lấy tin nhắn nếu cần
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuOpen = Boolean(anchorEl);

    return (
        <>
            <Box className="notification-icons">
                <IconButton
                    aria-label="hiển thị 4 tin nhắn mới"
                    color="inherit"
                    className="icon-button"
                    onClick={handleClickMessages}
                >
                    <Badge badgeContent={messages.length} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <Typography className="icon-text">Tin nhắn</Typography>
            </Box>
            <Box className="notification-icons">
                <IconButton
                    aria-label="hiển thị 11 thông báo mới"
                    color="inherit"
                    className="icon-button"
                    onClick={handleClickNotifications}
                >
                    <Badge badgeContent={notifications.length} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography className="icon-text">Thông báo</Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={menuOpen}
                    onClose={handleClose}
                >
                    {notifications.length > 0 ? (
                        notifications.map((notification, index) => (
                            <MenuItem key={index} onClick={handleClose}>
                                {notification.message}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem onClick={handleClose}>Không có thông báo</MenuItem>
                    )}
                </Menu>
            </Box>
        </>
    );
}

export default NotificationIcons;
