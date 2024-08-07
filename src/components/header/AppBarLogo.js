import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SearchItems from "../search/SearchItems";

function AppBarLogo() {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                sx={{
                    ml: 2,
                    fontFamily: 'Arial',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                TDH MEDIA
            </Typography>
            <Box sx={{ ml: 2, flexGrow: 1 }}>
                <SearchItems />
            </Box>
        </Box>
    );
}

export default AppBarLogo;
