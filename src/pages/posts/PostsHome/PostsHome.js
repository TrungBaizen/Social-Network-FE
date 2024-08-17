// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Card, Avatar, Button, List, Modal, Typography, IconButton, TextField, Menu, MenuItem, Box } from '@mui/material';
// import { ThumbUpOffAlt as LikeOutlined, ThumbUp as LikeFilled, Comment as CommentOutlined, MoreVert as MoreOutlined } from '@mui/icons-material';
// import './PostsHome.css';
// import LikesModal from "../../likes/LikesModal";
// import EditPostModal from "../EditPostModal";
//
// const { Title, Text } = Typography;
//
// const PostsHome = () => {
//     const [posts, setPosts] = useState([]);
//     const [selectedPost, setSelectedPost] = useState(null);
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//     const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
//     const [isPostModalOpen, setIsPostModalOpen] = useState(false);
//     const [anchorEl, setAnchorEl] = useState(null);
//     const [currentPostId, setCurrentPostId] = useState(null);
//
//     useEffect(() => {
//         const fetchPosts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:4000/posts');
//                 setPosts(response.data.posts || []);
//             } catch (error) {
//                 console.error('Lỗi khi lấy dữ liệu bài viết:', error);
//             }
//         };
//         fetchPosts();
//     }, []);
//
//     const handleEditPost = async (updatedPost) => {
//         // Xử lý logic chỉnh sửa bài viết ở đây
//     };
//
//     const handleLikeClick = async (postId) => {
//         // Xử lý logic thích bài viết ở đây
//     };
//
//     const handleMenuOpen = (event, postId) => {
//         setAnchorEl(event.currentTarget);
//         setCurrentPostId(postId);
//     };
//
//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };
//
//     const handleMenuAction = (action) => {
//         if (action === 'edit') {
//             const post = posts.find(p => p.id === currentPostId);
//             setSelectedPost(post);
//             setIsEditModalOpen(true);
//         } else if (action === 'delete') {
//             // Xử lý logic xóa bài viết ở đây
//         }
//         handleMenuClose();
//     };
//
//     const open = Boolean(anchorEl);
//
//     return (
//         <div>
//             {posts && posts.length > 0 ? (
//                 posts.map(post => {
//                     const imageCount = post.postImages?.length || 0;
//                     const imagesClass = imageCount >= 3 ? 'grid' : 'single';
//
//                     return (
//                         <Card key={post.id} className="post-card" sx={{ marginBottom: 2 }}>
//                             <div className="post-header" style={{ display: 'flex', alignItems: 'center' }}>
//                                 <Avatar src="default-avatar.jpg" />
//                                 <Title level={4} style={{ marginLeft: 10 }}>
//                                     {post.firstName} {post.lastName}
//                                 </Title>
//                                 <IconButton
//                                     edge="end"
//                                     aria-label="more"
//                                     aria-controls="post-menu"
//                                     aria-haspopup="true"
//                                     onClick={(e) => handleMenuOpen(e, post.id)}
//                                 >
//                                     <MoreOutlined />
//                                 </IconButton>
//                                 <Menu
//                                     id="post-menu"
//                                     anchorEl={anchorEl}
//                                     open={open}
//                                     onClose={handleMenuClose}
//                                 >
//                                     <MenuItem onClick={() => handleMenuAction('edit')}>Chỉnh sửa bài viết</MenuItem>
//                                     <MenuItem onClick={() => handleMenuAction('delete')}>Xóa bài viết</MenuItem>
//                                 </Menu>
//                             </div>
//                             <div className={`post-images ${imagesClass}`}>
//                                 {post.postImages && post.postImages.length > 0 ? (
//                                     post.postImages.map((image, index) => (
//                                         <img
//                                             key={index}
//                                             src={image}
//                                             alt={`Bài viết ${index + 1}`}
//                                             className="post-image"
//                                         />
//                                     ))
//                                 ) : (
//                                     <p>Không có hình ảnh</p>
//                                 )}
//                             </div>
//                             <Text>{post.content || 'Không có nội dung'}</Text>
//                             <div className="post-stats" onClick={() => setIsLikesModalOpen(true)}>
//                                 {post.likes?.length ? (
//                                     <>
//                                         <LikeFilled style={{ marginRight: 8, color: '#1976d2' }} /> {post.likes.length} lượt thích
//                                     </>
//                                 ) : (
//                                     <>
//                                         <LikeOutlined style={{ marginRight: 8 }} /> {post.likes?.length || 0} lượt thích
//                                     </>
//                                 )}
//                             </div>
//                             <div className="post-actions">
//                                 <Button
//                                     className="post-action-button"
//                                     startIcon={post.likes?.length ? <LikeFilled /> : <LikeOutlined />}
//                                     onClick={() => handleLikeClick(post.id)}
//                                 >
//                                     {post.likes?.length ? 'Đã thích' : 'Thích'}
//                                 </Button>
//                                 <Button
//                                     className="post-action-button"
//                                     startIcon={<CommentOutlined />}
//                                     onClick={() => {
//                                         setSelectedPost(post);
//                                         setIsPostModalOpen(true);
//                                     }}
//                                 >
//                                     Bình luận
//                                 </Button>
//                             </div>
//                         </Card>
//                     );
//                 })
//             ) : (
//                 <p>Không có bài viết nào</p>
//             )}
//
//             <Modal
//                 open={isEditModalOpen}
//                 onClose={() => setIsEditModalOpen(false)}
//             >
//                 <Box sx={{ padding: 2 }}>
//                     <EditPostModal
//                         open={isEditModalOpen}
//                         onCancel={() => setIsEditModalOpen(false)}
//                         post={selectedPost}
//                         onEdit={handleEditPost}
//                     />
//                 </Box>
//             </Modal>
//
//             <LikesModal
//                 open={isLikesModalOpen}
//                 onCancel={() => setIsLikesModalOpen(false)}
//                 likedBy={[]} // Có thể cần truyền dữ liệu thực sự vào đây
//             />
//
//             <Modal
//                 open={isPostModalOpen}
//                 onClose={() => setIsPostModalOpen(false)}
//             >
//                 <Box sx={{ padding: 2 }}>
//                     <Card className="post-card">
//                         <div className="post-header" style={{ display: 'flex', alignItems: 'center' }}>
//                             <Avatar src="default-avatar.jpg" />
//                             <Title level={4} style={{ marginLeft: 10 }}>
//                                 {selectedPost?.firstName} {selectedPost?.lastName || 'Không có tên'}
//                             </Title>
//                         </div>
//                         <div className={`post-images ${selectedPost?.postImages?.length >= 3 ? 'grid' : 'single'}`}>
//                             {selectedPost?.postImages && selectedPost.postImages.length > 0 ? (
//                                 selectedPost.postImages.map((image, index) => (
//                                     <img
//                                         key={index}
//                                         src={image}
//                                         alt={`Bài viết ${index + 1}`}
//                                         className="post-image"
//                                     />
//                                 ))
//                             ) : (
//                                 <p>Không có hình ảnh</p>
//                             )}
//                         </div>
//                         <Text>{selectedPost?.content || 'Không có nội dung'}</Text>
//                         <div className="post-stats">
//                             {selectedPost?.likes?.length ? (
//                                 <>
//                                     <LikeFilled style={{ marginRight: 8, color: '#1976d2' }} /> {selectedPost.likes.length} lượt thích
//                                 </>
//                             ) : (
//                                 <>
//                                     <LikeOutlined style={{ marginRight: 8 }} /> {selectedPost?.likes?.length || 0} lượt thích
//                                 </>
//                             )}
//                         </div>
//                         <div className="post-comments">
//                             <Title level={4}>Bình luận:</Title>
//                             <List
//                                 dataSource={selectedPost?.comments || []}
//                                 renderItem={item => (
//                                     <List.Item>{item}</List.Item>
//                                 )}
//                             />
//                             <TextField
//                                 multiline
//                                 rows={4}
//                                 placeholder="Viết bình luận..."
//                                 variant="outlined"
//                                 fullWidth
//                             />
//                             <Button
//                                 variant="contained"
//                                 color="primary"
//                                 style={{ marginTop: 10 }}
//                             >
//                                 Gửi
//                             </Button>
//                         </div>
//                     </Card>
//                 </Box>
//             </Modal>
//         </div>
//     );
// };
//
// export default PostsHome;
