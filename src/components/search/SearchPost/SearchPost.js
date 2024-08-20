import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Dropdown, Input, List, Menu, Modal, Typography } from 'antd';
import { CommentOutlined, LikeFilled, LikeOutlined, MoreOutlined } from '@ant-design/icons';
import './SearchPost.css';
import { decodeAndDecompressImageFile } from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import { Link } from 'react-router-dom';
import LikesModal from "../../../pages/likes/LikesModal";
import EditPostModal from "../../../pages/posts/EditPostModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

const SearchPost = ({ post }) => {
    const [avatarImage, setAvatarImage] = useState('');
    const [decodeImages, setDecodeImages] = useState([]);
    const [liked, setLiked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageUrl = post.imageAvatar
                    ? await decodeAndDecompressImageFile(decodeURIComponent(post.imageAvatar))
                    : "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg";
                setAvatarImage(imageUrl);
            } catch (error) {
                console.error('Error decoding image:', error);
            }
        };
        fetchImage();
    }, [post.imageAvatar]);

    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const decodeImageList = post.postImages
                    ? await Promise.all(post.postImages.map(async (postImage) =>
                        decodeAndDecompressImageFile(decodeURIComponent(postImage.image))
                    ))
                    : [];
                setDecodeImages(decodeImageList);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };
        fetchDecodedImages();
    }, [post.postImages]);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const showPostModal = () => setIsModalVisible(true);
    const showLikesModal = () => setIsLikesModalVisible(true);
    const showEditModal = () => setIsEditModalVisible(true);

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsLikesModalVisible(false);
        setIsEditModalVisible(false);
    };

    const handleMenuClick = (e) => {
        if (e.key === '1') {
            showEditModal();
        } else if (e.key === '2') {
            // Handle post delete
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Sửa bài viết</Menu.Item>
            <Menu.Item key="2">Xóa bài viết</Menu.Item>
        </Menu>
    );

    const generateProfileLink = (email) => email === currentUserEmail
        ? `/profile`
        : `/friendsprofile?email=${email}`;

    // Determine the appropriate CSS class based on the number of images
    const getImageClassName = () => {
        const imageCount = post.postImages?.length || 0;
        if (imageCount === 1) return 'single-image';
        if (imageCount === 2) return 'double-image';
        if (imageCount === 3) return 'triple-image';
        if (imageCount >= 4) return 'quadriple-image';
        return '';
    };

    return (
        <div>
            <Card className={`search-post-card ${getImageClassName()}`}>
                <div className="search-post-header">
                    <Link to={generateProfileLink(post.email)} style={{ textDecoration: 'none' }}>
                        <Avatar src={avatarImage} />
                    </Link>
                    <div>
                        <Link to={generateProfileLink(post.email)} style={{ textDecoration: 'none' }}>
                            <Title level={4} style={{ marginLeft: 10 }}>
                                {post.firstName} {post.lastName}
                            </Title>
                        </Link>
                    </div>
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <Button
                            className="more-options-button"
                            onClick={(e) => e.preventDefault()}
                        >
                            <MoreOutlined />
                        </Button>
                    </Dropdown>
                </div>

                <Text>{post.content}</Text>

                <div className="search-post-images">
                    {decodeImages.slice(0, 4).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Post Image ${index + 1}`}
                            className="search-post-image"
                            onClick={showPostModal}
                        />
                    ))}
                </div>

                <div className="search-post-detail-like-count-container" onClick={showLikesModal}>
                    {post.likes && post.likes.length > 0 ? (
                        <>
                            <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes.length} lượt thích
                        </>
                    ) : (
                        <>
                            <LikeOutlined style={{ marginRight: 8 }} /> 0 lượt thích
                        </>
                    )}
                </div>

                <div className="search-post-actions">
                    <Button
                        className="post-action-button"
                        icon={liked ? <LikeFilled /> : <LikeOutlined />}
                        onClick={handleLikeClick}
                    >
                        {liked ? 'Đã thích' : 'Thích'}
                    </Button>
                    <Button
                        className="post-action-button"
                        icon={<CommentOutlined />}
                        onClick={showPostModal}
                    >
                        Bình luận
                    </Button>
                </div>
            </Card>

            <Modal
                title="Chi tiết bài đăng"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
            >
                <Card className="search-post-card">
                    <div className="search-post-header">
                        <Avatar src={avatarImage} />
                        <Title level={4} style={{ marginLeft: 10 }}>
                            {post.firstName} {post.lastName}
                        </Title>
                        <Text className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
                    </div>

                    <Text>{post.content}</Text>

                    <div className="search-post-images">
                        {decodeImages.length > 0 ? (
                            decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="search-post-image"
                                    onClick={showPostModal}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>

                    <div className="search-post-detail-like-count-container" onClick={showLikesModal}>
                        {post.likes && post.likes.length > 0 ? (
                            <>
                                <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes.length} lượt thích
                            </>
                        ) : (
                            <>
                                <LikeOutlined style={{ marginRight: 8 }} /> 0 lượt thích
                            </>
                        )}
                    </div>

                    <div className="search-post-comments">
                        <Title level={4}>Bình luận:</Title>
                        <List
                            dataSource={comments}
                            renderItem={item => (
                                <List.Item>{item}</List.Item>
                            )}
                        />
                        <TextArea
                            rows={4}
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Viết bình luận..."
                        />
                        <Button
                            type="primary"
                            onClick={handleCommentSubmit}
                            style={{ marginTop: 10 }}
                        >
                            Gửi
                        </Button>
                    </div>
                </Card>
            </Modal>

            <LikesModal
                visible={isLikesModalVisible}
                onCancel={handleCancel}
                likes={post.likes || []}
                avatar={post.imageAvatar}
            />

            <EditPostModal
                visible={isEditModalVisible}
                onCancel={handleCancel}
                post={post}
                avatarImage={avatarImage}
            />
        </div>
    );
};

export default SearchPost;
