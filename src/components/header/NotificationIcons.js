import React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';

function NotificationIcons() {
    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    className="icon-button"
                >
                    <Badge badgeContent={4} color="secondary">
                        <MailIcon />
                    </Badge>
                </IconButton>
                <Typography>Messages</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mx: 2 }}>
                <IconButton
                    aria-label="show 11 new notifications"
                    color="inherit"
                    className="icon-button"
                >
                    <Badge badgeContent={11} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography>Notifications</Typography>
            </Box>
        </>
    );
}

export default NotificationIcons;
