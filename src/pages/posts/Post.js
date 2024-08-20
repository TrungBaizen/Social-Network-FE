import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Dropdown, Input, List, Menu, Modal, Typography } from 'antd';
import { CommentOutlined, LikeFilled, LikeOutlined, MoreOutlined } from '@ant-design/icons';
import './Post.css';
import EditPostModal from './EditPostModal';
import LikesModal from '../likes/LikesModal';
import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, updatePost } from "../../redux/services/postService";
import { compressAndEncodeImageFile } from "../../EncodeDecodeImage/compressAndEncodeImageFile";

const { Title, Text } = Typography;
const { TextArea } = Input;

const Post = ({ post, avatarImage }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [liked, setLiked] = useState(false);
    const [decodeImages, setDecodeImages] = useState([]);
    const profile = useSelector(({ profiles }) => profiles.profile);
    const dispatch = useDispatch();
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const id = post.id;

    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const postList = post.postImages;
                const decodeImageList = postList && postList.length > 0
                    ? await Promise.all(postList.map(async (post) => {
                        return decodeAndDecompressImageFile(decodeURIComponent(post.image));
                    }))
                    : [];
                setDecodeImages(decodeImageList);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };
        fetchDecodedImages();
    }, [post.postImages]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const showPostModal = () => {
        setIsModalVisible(true);
    };

    const showLikesModal = () => {
        setIsLikesModalVisible(true);
    };

    const showEditModal = () => {
        setIsEditModalVisible(true);
    };

    const handleEditPost = async (updatedPost) => {
        const urlToFile = async (url, filename) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], filename, { type: blob.type });
            return file;
        };
        const listImage = await Promise.all(updatedPost.image.map(async (imageUrl, index) => {
            return await urlToFile(imageUrl, `image-${index}.jpg`);
        }));
        const postImages = listImage ? await Promise.all(listImage.map(async (file) => {
            return await compressAndEncodeImageFile(file);
        })) : [];
        const posts = {
            email: email,
            content: updatedPost.content,
            postImages: postImages,
            postStatus: updatedPost.visibility
        };
        dispatch(updatePost({ post: posts, id }));
        setIsEditModalVisible(false);
    };

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsLikesModalVisible(false);
        setIsEditModalVisible(false);
    };

    const handleMenuClick = (e) => {
        if (e.key === '1') {
            showEditModal();
        } else if (e.key === '2') {
            dispatch(deletePost(post.id));
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Sửa bài viết</Menu.Item>
            <Menu.Item key="2">Xóa bài viết</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Card className="post-card">
                <div className="post-header">
                    <Avatar src={avatarImage} />
                    <div>
                        <Title level={4} style={{ marginLeft: 10 }}>
                            {profile.firstName + " " + profile.lastName}
                        </Title>
                        <Text className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
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

                {/* Hiển thị nội dung bài đăng trước */}
                <Text>{post.content}</Text>

                {/* Hiển thị ảnh sau nội dung */}
                <div className="post-images">
                    {decodeImages && decodeImages.length > 0 && (
                        <div className="post-images">
                            {decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                    onClick={() => showPostModal(image)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Hiển thị số lượt thích và thêm chức năng mở LikesModal */}
                <div className="post-detail-like-count-container" onClick={showLikesModal}>
                    <LikeOutlined className="post-detail-like-icon" />
                    <Text className="post-detail-like-count">
                        {post.likes} lượt thích
                    </Text>
                </div>

                <div className="post-actions">
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
                <Card className="post-card">
                    <div className="post-header">
                        <Avatar src={avatarImage} />
                        <Title level={4} style={{ marginLeft: 10 }}>
                            {profile.firstName + " " + profile.lastName}
                        </Title>
                        <div>
                            <Text className="post-date">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </Text>
                        </div>
                    </div>

                    <Text>{post.content}</Text>

                    <div className="post-images">
                        {decodeImages && decodeImages.length > 0 ? (
                            decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                    onClick={() => showPostModal(image)}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>

                    <div className="post-comments">
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
                likedBy={post.likedBy}
            />

            <EditPostModal
                visible={isEditModalVisible}
                onCancel={handleCancel}
                post={post}
                onEdit={handleEditPost}
                avatarImage={avatarImage}
            />
        </div>
    );
};

export default Post;
