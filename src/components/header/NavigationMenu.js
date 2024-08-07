import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages = [
    { title: 'Home', icon: <HomeIcon sx={{ color: 'white' }} />, link: '/' },
    { title: 'Group', icon: <GroupIcon sx={{ color: 'white' }} />, link: '/group' },
    { title: 'Account', icon: <AccountCircleIcon sx={{ color: 'white' }} />, link: '/account' },
];

function NavigationMenu({ handleCloseNavMenu }) {
    return (
        <Box className="nav-menu">
            {pages.map((page) => (
                <Button
                    key={page.title}
                    onClick={handleCloseNavMenu}
                    className="nav-menu-button"
                    startIcon={page.icon}
                    component={Link}
                    to={page.link}
                >
                    {page.title}
                </Button>
            ))}
        </Box>
    );
}

export default NavigationMenu;
