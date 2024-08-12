// import React from 'react';
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import MailIcon from '@mui/icons-material/Mail';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import Typography from '@mui/material/Typography';
// import './NotificationIcons.css';
//
// function NotificationIcons() {
//     return (
//         <>
//             <Box className="notification-icons">
//                 <IconButton
//                     aria-label="show 4 new mails"
//                     color="inherit"
//                     className="icon-button"
//                 >
//                     <Badge badgeContent={4} color="secondary">
//                         <MailIcon />
//                     </Badge>
//                 </IconButton>
//                 <Typography className="icon-text">Messages</Typography>
//             </Box>
//             <Box className="notification-icons">
//                 <IconButton
//                     aria-label="show 11 new notifications"
//                     color="inherit"
//                     className="icon-button"
//                 >
//                     <Badge badgeContent={11} color="secondary">
//                         <NotificationsIcon />
//                     </Badge>
//                 </IconButton>
//                 <Typography className="icon-text">Notifications</Typography>
//             </Box>
//         </>
//     );
// }
//
// export default NotificationIcons;



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
    const [notifications, setNotifications] = useState([]); // Mock notifications data
    const [messages, setMessages] = useState([]); // Mock messages data

    const handleClickNotifications = (event) => {
        setAnchorEl(event.currentTarget);
        // Fetch notifications if necessary
    };

    const handleClickMessages = (event) => {
        setAnchorEl(event.currentTarget);
        // Fetch messages if necessary
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const menuOpen = Boolean(anchorEl);

    return (
        <>
            <Box className="notification-icons">
                <IconButton
                    aria-label="show 4 new mails"
                    color="inherit"
                    className="icon-button"
                    onClick={handleClickMessages}
                >
                    <Badge badgeContent={messages.length} color="secondary">
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
                    onClick={handleClickNotifications}
                >
                    <Badge badgeContent={notifications.length} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
                <Typography className="icon-text">Notifications</Typography>
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
                        <MenuItem onClick={handleClose}>No Notifications</MenuItem>
                    )}
                </Menu>
            </Box>
        </>
    );
}

export default NotificationIcons;
