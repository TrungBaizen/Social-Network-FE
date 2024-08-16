import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";
import GroupIcon from "@mui/icons-material/Group";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

const pages = [
    { title: 'Home', icon: <HomeIcon sx={{ color: 'white' }} />, link: '/' },
    { title: 'Group', icon: <GroupIcon sx={{ color: 'white' }} />, link: '/group' },
    { title: 'Account', icon: <AccountCircleIcon sx={{ color: 'white' }} />, link: '/account' },
];

function MobileNavMenu({ anchorElNav, handleOpenNavMenu, handleCloseNavMenu }) {
    return (
        <>
            <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
            >
                {pages.map((page) => (
                    <MenuItem key={page.title} onClick={handleCloseNavMenu} component={Link} to={page.link}>
                        <IconButton color="inherit">
                            {page.icon}
                        </IconButton>
                        <Typography className="menu-item-text">{page.title}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}

export default MobileNavMenu;
