import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchItems from "../search/SearchItems";
import './Header.css';

const pages = [
    { title: 'Home', icon: <HomeIcon sx={{ color: 'white' }} />, link: '/' },
    { title: 'Home', icon: <HomeIcon sx={{ color: 'white' }} />, link: '/' },
    { title: 'Home', icon: <HomeIcon sx={{ color: 'white' }} />, link: '/' },
    { title: 'Group', icon: <GroupIcon sx={{ color: 'white' }} />, link: '/group' },
    { title: 'Account', icon: <AccountCircleIcon sx={{ color: 'white' }} />, link: '/account' },
];

const settings = [
    { title: 'Profile', link: '/profile' },
    { title: 'Account', link: '/account' },
    { title: 'Dashboard', link: '/dashboard' },
    { title: 'Logout', link: '/login' }
];

function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="sticky" className="app-bar">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                        <AdbIcon className="app-bar-logo" />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link} // Use Link component
                            to="/" // Set the path for the logo
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>

                        {/* Search */}
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            <SearchItems />
                        </Box>
                        {/* Search */}
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
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
                    </Box>

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
                                <MenuItem key={setting.title} onClick={handleCloseUserMenu} component={Link} to={setting.link}>
                                    <Typography textAlign="center">{setting.title}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
