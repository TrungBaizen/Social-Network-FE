import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Dropdown, Menu } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined, EditOutlined, DeleteOutlined, MoreOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { decodeAndDecompressImageFile } from '../../../EncodeDecodeImage/decodeAndDecompressImageFile';
import LikesModal from "../../likes/LikesModal";
import ImageModal from "./ImageModal";
import './PostDetail.css';
import EditPostHomeModal from "./EditPostHomeModal/EditPostHomeModal";

const { Title, Text } = Typography;

const PostDetail = ({ post, likedPosts, onLikeClick, onCommentClick, onPostEdit }) => {
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false); // State for EditPostHomeModal
    const { id, email } = JSON.parse(localStorage.getItem('currentUser'));

    // Handle like click
    const handleLikeClick = (postId) => {
        onLikeClick(postId);
    };

    // Handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setIsImageModalVisible(true);
    };

    // Handle comment click
    const handleCommentClick = (post) => {
        onCommentClick(post);
    };

    // Show likes modal
    const showLikesModal = () => {
        setIsLikesModalVisible(true);
    };

    // Handle closing of likes modal
    const handleLikesModalClose = () => {
        setIsLikesModalVisible(false);
    };

    // Handle closing of image modal
    const handleImageModalClose = () => {
        setIsImageModalVisible(false);
        setSelectedImage(null);
    };

    // Expand or collapse images
    const handleExpandClick = () => {
        setIsExpanded(!isExpanded);
    };

    // Open edit modal
    const handleEditClick = () => {
        setIsEditModalVisible(true); // Open the EditPostHomeModal
    };

    // Handle post edit
    const handleEditPost = (updatedPost) => {
        onPostEdit(updatedPost); // Call the prop function to handle the edited post
        setIsEditModalVisible(false); // Close the modal
    };

    // Like count fallback
    const likeCount = post.likesCount || 0;

    // Determine image class based on number of images
    const imageClass = () => {
        if (!post.postImages) return '';
        if (post.postImages.length === 1) return 'one-image';
        if (post.postImages.length === 2) return 'two-images';
        return 'three-or-more-images';
    };
    const profileLink = email === post.email
        ? '/profile'
        : `/friendsprofile?email=${post.email}`;
    return (
        <>
            <Card
                className="post-detail-card"
                actions={[
                    <Button
                        key="like"
                        icon={likedPosts.has(post.id) ? <LikeFilled /> : <LikeOutlined />}
                        onClick={() => handleLikeClick(post.id)}
                    >
                        {likedPosts.has(post.id) ? 'Đã thích' : 'Thích'}
                    </Button>,
                    <Button
                        key="comment"
                        icon={<CommentOutlined />}
                        onClick={() => handleCommentClick(post)}
                    >
                        Bình luận
                    </Button>
                ]}
            >
                <div className="post-detail-header d-flex justify-content-between">
                    <div className="post-info d-flex align-items-center">
                        <Link to={profileLink} style={{ textDecoration: 'none' }}>
                            <Avatar
                                src={decodeAndDecompressImageFile(decodeURIComponent(post.imageAvatar))}
                                className="post-avatar"
                            />
                        </Link>
                        <div className="post-detail-author-date ml-2">
                            <Link to={profileLink} style={{ textDecoration: 'none' }}>
                                <Title level={4} className="post-detail-author">
                                    {`${post.firstName || 'Tên'} ${post.lastName || 'Người dùng'}`}
                                </Title>
                            </Link>
                            <Text className="post-detail-date">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </Text>
                        </div>
                    </div>
                    <Dropdown
                        overlay={
                            <Menu>
                                <Menu.Item key="edit" icon={<EditOutlined />} onClick={handleEditClick}>
                                    Chỉnh sửa
                                </Menu.Item>
                                <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={() => console.log('Delete')}>
                                    Xóa
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                        placement="bottomRight"
                    >
                        <Button icon={<MoreOutlined />} className="post-detail-more-btn" />
                    </Dropdown>
                </div>
                <Text className="post-detail-content">{post.content}</Text>
                <div className={`post-detail-images ${imageClass()}`}>
                    <div className={`post-detail-images-container ${isExpanded ? 'expanded' : ''}`}>
                        {(post.postImages || []).map((image, index) => (
                            <div key={index} className="post-detail-image-container">
                                <img
                                    src={decodeAndDecompressImageFile(decodeURIComponent(image.image))}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-detail-image"
                                    onClick={() => handleImageClick(image.image)}
                                />
                            </div>
                        ))}
                    </div>
                    {post.postImages && post.postImages.length > 3 && (
                        <Button className="post-detail-expand-button" onClick={handleExpandClick}>
                            {isExpanded ? 'Thu gọn' : 'Mở rộng'}
                        </Button>
                    )}
                </div>
                <div className="post-detail-like-count-container" onClick={showLikesModal}>
                    <LikeOutlined className="post-detail-like-icon" />
                    <Text className="post-detail-like-count">
                        {likeCount} lượt thích
                    </Text>
                </div>
            </Card>

            <LikesModal
                visible={isLikesModalVisible}
                onClose={handleLikesModalClose}
                likedBy={post.likes || []}
            />

            <ImageModal
                visible={isImageModalVisible}
                onClose={handleImageModalClose}
                image={selectedImage}
                author={{ name: `${post.firstName || 'Tên'} ${post.lastName || 'Người dùng'}`, avatar: post.avatar }}
                date={new Date(post.createdAt).toLocaleDateString()}
                comments={post.comments || []}
            />

            <EditPostHomeModal
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                post={post}
                onEdit={handleEditPost}
                avatarImage={post.avatar} // Pass the avatar image to EditPostHomeModal
            />
        </>
    );
};

export default PostDetail;
