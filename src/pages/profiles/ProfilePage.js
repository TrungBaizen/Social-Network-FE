// import React from 'react';
// import { Box, Grid, Typography, Button, Avatar } from '@mui/material';
// import './ProfilePage.css';
//
// const ProfilePage = () => {
//     return (
//         <Box sx={{ width: '100%' }}>
//             {/* Hình ảnh hồ sơ */}
//             <Box sx={{ position: 'relative' }}>
//                 <img
//                     src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//                     alt="Cover"
//                     style={{ width: '100%', height: 300, objectFit: 'cover' }}
//                 />
//                 <Avatar
//                     src="https://images.pexels.com/photos/14028501/pexels-photo-14028501.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load"
//                     alt="Profile"
//                     sx={{
//                         width: 120,
//                         height: 120,
//                         border: '3px solid white',
//                         position: 'absolute',
//                         bottom: -60,
//                         left: '50%',
//                         transform: 'translateX(-50%)',
//                     }}
//                 />
//             </Box>
//             <Box sx={{ marginTop: '60px', padding: 2 }}>
//                 <Grid container spacing={3} justifyContent="center">
//                     <Grid item xs={12} md={4}>
//                         {/* Liên kết mạng xã hội */}
//                         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                             <Typography variant="h6">Jane Doe</Typography>
//                             <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
//                                     <p>Hi!</p>
//                                 </Box>
//                                 <Box sx={{ display: 'flex', gap: 2 }}>
//                                     <Button variant="contained" color="primary">
//                                         Theo dõi
//                                     </Button>
//                                     <Button variant="contained" color="primary">
//                                         Kết Bạn
//                                     </Button>
//                                 </Box>
//                             </Box>
//                         </Box>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Box>
//     );
// };
//
// export default ProfilePage;
