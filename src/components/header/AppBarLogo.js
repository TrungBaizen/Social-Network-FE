// import React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import { Link } from 'react-router-dom';
// import SearchItems from "../search/SearchItems";
// import './AppBarLogo.css';
//
// function AppBarLogo() {
//     return (
//         <Box className="app-bar-logo">
//             <Typography
//                 variant="h6"
//                 noWrap
//                 component={Link}
//                 to="/"
//                 className="logo-typography"
//             >
//                 TDH
//             </Typography>
//             <Box className="search-box">
//                 <SearchItems />
//             </Box>
//         </Box>
//     );
// }
//
// export default AppBarLogo;


import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
<<<<<<< HEAD
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import SearchItems from '../search/SearchItems';
import './AppBarLogo.css';
=======
import {Link} from 'react-router-dom';
import SearchItems from "../search/SearchItems";
import './AppBarLogo.css'; // Import file CSS
>>>>>>> master

function AppBarLogo() {
    return (
        <Box className="app-bar-logo" display="flex" alignItems="center" justifyContent="space-between">
            <Typography
                variant="h6"
                noWrap
                component={Link}
                to="/"
                className="logo-typography"
            >
                TDH
            </Typography>
            <Box className="search-box" display="flex" alignItems="center">
                <SearchItems />
                <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/search"
                    sx={{ marginLeft: 2 }}
                >
                    Search
                </Button>
            </Box>
        </Box>
    );
}

export default AppBarLogo;
