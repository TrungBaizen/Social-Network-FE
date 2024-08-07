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
import SearchItems from "../search/SearchItems";

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
                    <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
                        <AppBarLogo />
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            <NavigationMenu handleCloseNavMenu={handleCloseNavMenu} />
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <MobileNavMenu
                            anchorElNav={anchorElNav}
                            handleOpenNavMenu={handleOpenNavMenu}
                            handleCloseNavMenu={handleCloseNavMenu}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
