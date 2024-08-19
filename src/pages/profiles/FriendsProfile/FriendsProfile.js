import React, {useEffect, useState} from 'react';
import {Card, Avatar, Typography, Button, Modal, Image, Dropdown, Menu, Input, List} from 'antd';
import {LikeOutlined, LikeFilled, CommentOutlined, EditOutlined, DeleteOutlined, MoreOutlined} from '@ant-design/icons';
import axios from 'axios';
import './FriendsProfile.css';
import {getAllPostByFollowing, getPostByUserId} from "../../../redux/services/postService";
import {useDispatch, useSelector} from "react-redux";
import {decodeAndDecompressImageFile} from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {getProfile} from "../../../redux/services/profileService";
import {useLocation} from "react-router-dom";

const {Title, Text} = Typography;
const {TextArea} = Input;

const FriendsProfile = () => {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [selectedImage, setSelectedImage] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [selectedPostComments, setSelectedPostComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch =useDispatch();
    const profile = useSelector(({profiles}) => profiles.profile);
    const posts = useSelector(({posts}) => posts.list);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                dispatch(getPostByUserId(profile.userId));
                setLoading(false);
            } catch (error) {
                setError('Failed to fetch posts');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [profile]);

    const handleLikeClick = (postId) => {
        setLikedPosts(prev => {
            const updatedLikes = new Set(prev);
            updatedLikes.has(postId) ? updatedLikes.delete(postId) : updatedLikes.add(postId);
            return updatedLikes;
        });
    };

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageModal(true);
    };

    const handleModalCancel = () => {
        setShowImageModal(false);
        setSelectedImage(null);
    };

    const handleEditClick = (postId) => {
        console.log(`Edit post with id: ${postId}`);
    };

    const handleDeleteClick = (postId) => {
        console.log(`Delete post with id: ${postId}`);
    };

    const handleCommentClick = (post) => {
        setSelectedPostComments(post.comments || []);
        setCommentModalVisible(true);
    };

    const handleCommentModalCancel = () => {
        setCommentModalVisible(false);
        setNewComment('');
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            // Logic to submit the comment can be added here
            setSelectedPostComments(prev => [...prev, newComment]);
            setNewComment('');
        }
    };

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error}</Text>;

    return (
        <div className="home-posts">
            {posts.length > 0 ? (
                posts.map(post => (
                    <Card
                        key={post.id}
                        className={`post-card ${post.postImages.length === 1 ? 'single-image-post' : post.postImages.length === 2 ? 'two-image-post' : 'multi-image-post'}`}
                        actions={[
                            <Button
                                key="like"
                                icon={likedPosts.has(post.id) ? <LikeFilled/> : <LikeOutlined/>}
                                onClick={() => handleLikeClick(post.id)}
                            >
                                {likedPosts.has(post.id) ? 'Đã thích' : 'Thích'}
                            </Button>,
                            <Button
                                key="comment"
                                icon={<CommentOutlined/>}
                                onClick={() => handleCommentClick(post)}
                            >
                                Bình luận
                            </Button>
                        ]}
                    >
                        <div className="post-header">
                            <div className="post-info">
                                <Avatar src={post.avatar} className="post-avatar"/>
                                <div className="post-author-date">
                                    <Title level={4} className="post-author">
                                        {`${post.firstName} ${post.lastName}`}
                                    </Title>
                                    <Text className="post-date">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </Text>
                                </div>
                            </div>
                        </div>
                        <div className="post-images">
                            {post.postImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={decodeAndDecompressImageFile(decodeURIComponent(image.image))}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                        <Text className="post-content">{post.content}</Text>
                    </Card>
                ))
            ) : (
                <Text>Không có bài viết nào</Text>
            )}

            <Modal
                open={showImageModal}
                footer={null}
                onCancel={handleModalCancel}
                width={800}
            >
                {selectedImage && <Image src={selectedImage} alt="Selected" style={{width: '100%'}}/>}
            </Modal>

            <Modal
                title="Bình luận"
                open={commentModalVisible}
                onCancel={handleCommentModalCancel}
                footer={null}
                width={800}
            >
                <List
                    dataSource={selectedPostComments}
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
                    style={{marginTop: 10}}
                >
                    Gửi
                </Button>
            </Modal>
        </div>
    );
};

export default FriendsProfile;
