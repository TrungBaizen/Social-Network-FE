import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Avatar, Button, List, Modal, Typography, Dropdown, Menu, Input } from 'antd';
import { LikeOutlined, LikeFilled, CommentOutlined, MoreOutlined } from '@ant-design/icons';
import './PostsHome.css';
import LikesModal from "../../likes/LikesModal";
import EditPostModal from "../EditPostModal";

const { Title, Text } = Typography;
const { TextArea } = Input;

const PostsHome = () => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isPostModalVisible, setIsPostModalVisible] = useState(false);

    useEffect(() => {
        // Fetch posts from the API
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/posts');
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleEditPost = async (updatedPost) => {
        // Handle post edit logic here
    };

    const handleLikeClick = async (postId) => {
        // Handle like logic here
    };

    const handleMenuClick = (e, postId) => {
        if (e.key === '1') {
            const post = posts.find(p => p.id === postId);
            setSelectedPost(post);
            setIsEditModalVisible(true);
        } else if (e.key === '2') {
            // Delete post logic here
        }
    };

    const menu = (postId) => (
        <Menu onClick={(e) => handleMenuClick(e, postId)}>
            <Menu.Item key="1">Edit Post</Menu.Item>
            <Menu.Item key="2">Delete Post</Menu.Item>
        </Menu>
    );

    return (
        <div>
            {posts.map(post => {
                const imageCount = post.postImages?.length || 0;
                const imagesClass = imageCount >= 3 ? 'grid' : 'single';

                return (
                    <Card key={post.id} className="post-card">
                        <div className="post-header">
                            <Avatar src="default-avatar.jpg" />
                            <Title level={4} style={{ marginLeft: 10 }}>
                                {post.email}
                            </Title>
                            <Dropdown overlay={menu(post.id)} trigger={['click']} placement="bottomRight">
                                <Button
                                    className="more-options-button"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <MoreOutlined />
                                </Button>
                            </Dropdown>
                        </div>
                        <div className={`post-images ${imagesClass}`}>
                            {post.postImages && post.postImages.length > 0 && (
                                post.postImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Post ${index + 1}`}
                                        className="post-image"
                                    />
                                ))
                            )}
                        </div>
                        <Text>{post.content}</Text>
                        <div className="post-stats" onClick={() => setIsLikesModalVisible(true)}>
                            {post.liked ? (
                                <>
                                    <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes + 1} likes
                                </>
                            ) : (
                                <>
                                    <LikeOutlined style={{ marginRight: 8 }} /> {post.likes} likes
                                </>
                            )}
                        </div>
                        <div className="post-actions">
                            <Button
                                className="post-action-button"
                                icon={post.liked ? <LikeFilled /> : <LikeOutlined />}
                                onClick={() => handleLikeClick(post.id)}
                            >
                                {post.liked ? 'Liked' : 'Like'}
                            </Button>
                            <Button className="post-action-button" icon={<CommentOutlined />} onClick={() => {
                                setSelectedPost(post);
                                setIsPostModalVisible(true);
                            }}>
                                Comment
                            </Button>
                        </div>
                    </Card>
                );
            })}

            <Modal
                title="Edit Post"
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
            >
                <EditPostModal
                    visible={isEditModalVisible}
                    onCancel={() => setIsEditModalVisible(false)}
                    post={selectedPost}
                    onEdit={handleEditPost}
                />
            </Modal>

            <LikesModal
                visible={isLikesModalVisible}
                onCancel={() => setIsLikesModalVisible(false)}
                likedBy={[]} // Provide the list of users who liked the post
            />

            <Modal
                title="Post Details"
                visible={isPostModalVisible}
                onCancel={() => setIsPostModalVisible(false)}
                footer={null}
                width={800}
            >
                <Card className="post-card">
                    <div className="post-header">
                        <Avatar src="default-avatar.jpg" />
                        <Title level={4} style={{ marginLeft: 10 }}>
                            {selectedPost?.email || 'No Email'}
                        </Title>
                    </div>
                    <div className={`post-images ${selectedPost?.postImages?.length >= 3 ? 'grid' : 'single'}`}>
                        {selectedPost?.postImages && selectedPost.postImages.length > 0 ? (
                            selectedPost.postImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post ${index + 1}`}
                                    className="post-image"
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <Text>{selectedPost?.content || 'No content'}</Text>
                    <div className="post-stats">
                        {selectedPost?.liked ? (
                            <>
                                <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {selectedPost.likes + 1} likes
                            </>
                        ) : (
                            <>
                                <LikeOutlined style={{ marginRight: 8 }} /> {selectedPost?.likes || 0} likes
                            </>
                        )}
                    </div>
                    <div className="post-comments">
                        <Title level={4}>Comments:</Title>
                        <List
                            dataSource={selectedPost?.comments || []}
                            renderItem={item => (
                                <List.Item>{item}</List.Item>
                            )}
                        />
                        <TextArea
                            rows={4}
                            placeholder="Write a comment..."
                        />
                        <Button
                            type="primary"
                            style={{ marginTop: 10 }}
                        >
                            Submit
                        </Button>
                    </div>
                </Card>
            </Modal>
        </div>
    );
};

export default PostsHome;
