import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import AppBarLogo from './AppBarLogo';
import NavigationMenu from './NavigationMenu';
import MobileNavMenu from './MobileNavMenu';
import NotificationIcons from './NotificationIcons';
import UserMenu from './UserMenu';
import './ResponsiveAppBar.css'; // Import file CSS mới

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
                <Toolbar className="toolbar" disableGutters>
                    <Box className="logo">
                        <AppBarLogo />
                    </Box>
                    <Box className="nav-menu" sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <NavigationMenu handleCloseNavMenu={handleCloseNavMenu} />
                    </Box>
                    <Box className="mobile-nav-menu" sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <MobileNavMenu
                            anchorElNav={anchorElNav}
                            handleOpenNavMenu={handleOpenNavMenu}
                            handleCloseNavMenu={handleCloseNavMenu}
                        />
                    </Box>
                    <Box className="notification-user-menu">
                        <NotificationIcons />
                        <UserMenu
                            anchorElUser={anchorElUser}
                            handleOpenUserMenu={handleOpenUserMenu}
                            handleCloseUserMenu={handleCloseUserMenu}
                        />
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default ResponsiveAppBar;
