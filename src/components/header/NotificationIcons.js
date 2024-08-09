import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import './NotificationIcons.css'; // Import file CSS mới

function NotificationIcons() {
    return (
        <>
            <Box className="notification-icons">
                <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    className="icon-button"
                >
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <Typography className="icon-text">Messages</Typography>
            </Box>
            <Box className="notification-icons">
                <IconButton
                    aria-label="show 11 new notifications"
                    color="inherit"
                    className="icon-button"
                >
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography className="icon-text">Notifications</Typography>
            </Box>
        </>
    );
}

export default NotificationIcons;
