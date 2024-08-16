import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom';
import SearchItems from "../search/SearchItems";
import './AppBarLogo.css'; // Import file CSS

function AppBarLogo() {
    return (
        <Box className="app-bar-logo">
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                className="logo-typography"
            >
                TDH
            </Typography>
            <Box className="search-box">
                <SearchItems />
            </Box>
        </Box>
    );
}

export default AppBarLogo;
