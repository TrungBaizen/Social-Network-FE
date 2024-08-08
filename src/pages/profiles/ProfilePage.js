import React from 'react';
import { Box, Grid, Typography, IconButton, Button, Avatar, Divider } from '@mui/material';
import FacebookTwoToneIcon from '@mui/icons-material/FacebookTwoTone';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import LanguageIcon from '@mui/icons-material/Language';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import './ProfilePage.css';

const ProfilePage = () => {
    return (
        <Box sx={{ width: '100%' }}>
            {/* Hình ảnh hồ sơ */}
            <Box sx={{ position: 'relative' }}>
                <img
                    src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Cover"
                    style={{ width: '100%', height: 300, objectFit: 'cover' }}
                />
                <Avatar
                    src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
                    alt="Profile"
                    sx={{
                        width: 120,
                        height: 120,
                        border: '3px solid white',
                        position: 'absolute',
                        bottom: -60,
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                />
            </Box>
            <Box sx={{ marginTop: '60px', padding: 2 }}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={4}>
                        {/* Liên kết mạng xã hội */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography variant="h6">Jane Doe</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                    <IconButton href="http://facebook.com">
                                        <FacebookTwoToneIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton href="http://instagram.com">
                                        <InstagramIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton href="http://twitter.com">
                                        <TwitterIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton href="http://linkedin.com">
                                        <LinkedInIcon fontSize="large" />
                                    </IconButton>
                                    <IconButton href="http://pinterest.com">
                                        <PinterestIcon fontSize="large" />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" color="textSecondary">
                                    <PlaceIcon sx={{ verticalAlign: 'middle' }} /> USA
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <LanguageIcon sx={{ verticalAlign: 'middle' }} /> lama.dev
                                </Typography>
                                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                                    Theo dõi
                                </Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default ProfilePage;
