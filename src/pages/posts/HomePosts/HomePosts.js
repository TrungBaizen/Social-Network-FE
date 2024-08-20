import React, { useEffect, useState } from 'react';
import { Typography, Button, Modal, Image, Input, List } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getAllPostByFollowing } from "../../../redux/services/postService";
import './HomePosts.css';
import { decodeAndDecompressImageFile } from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import PostDetail from "./PostDetail";

const { Text } = Typography;
const { TextArea } = Input;

const HomePosts = () => {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [selectedPost, setSelectedPost] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [commentModalVisible, setCommentModalVisible] = useState(false);
    const [selectedPostComments, setSelectedPostComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const profile = useSelector(({ profiles }) => profiles.profile);
    const dispatch = useDispatch();
    const posts = useSelector(({ posts }) => posts.listPostHome);
    const { id, email } = JSON.parse(localStorage.getItem('currentUser'));


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await dispatch(getAllPostByFollowing(id));
                setLoading(false);
            } catch (error) {
                setError('Không thể tải bài viết');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [dispatch, id]);

    const handleLikeClick = (postId) => {
        setLikedPosts(prev => {
            const updatedLikes = new Set(prev);
            updatedLikes.has(postId) ? updatedLikes.delete(postId) : updatedLikes.add(postId);
            return updatedLikes;
        });
    };

    const handleImageClick = (post) => {
        setSelectedPost(post);
        setShowImageModal(true);
    };

    const handleModalCancel = () => {
        setShowImageModal(false);
        setSelectedPost(null);
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
            setSelectedPostComments(prev => [...prev, newComment]);
            setNewComment('');
        }
    };

    const filteredPosts = posts.filter(post =>
        post.email === profile.email || post.postStatus !== 'PRIVATE'
    );

    if (loading) return <Text>Đang tải...</Text>;
    if (error) return <Text>Lỗi: {error}</Text>;

    return (
        <div className="HomePosts-home-posts">
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <PostDetail
                        key={post.id}
                        post={post}
                        likedPosts={likedPosts}
                        onLikeClick={handleLikeClick}
                        onImageClick={handleImageClick}
                        onCommentClick={handleCommentClick}
                    />
                ))
            ) : (
                <Text>Không có bài viết nào</Text>
            )}

            <Modal
                visible={showImageModal}
                footer={null}
                onCancel={handleModalCancel}
                width={800}
            >
                {selectedPost && selectedPost.postImages && (
                    <Image
                        src={decodeAndDecompressImageFile(decodeURIComponent(selectedPost.postImages[0].image))}
                        alt="Selected"
                        style={{ width: '100%' }}
                    />
                )}
            </Modal>

            <Modal
                title="Bình luận"
                visible={commentModalVisible}
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
                    style={{ marginTop: 10 }}
                >
                    Gửi
                </Button>
            </Modal>
        </div>
    );
};

export default HomePosts;
