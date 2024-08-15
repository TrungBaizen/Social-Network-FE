import React, { useEffect, useState } from 'react';
import { Layout, Button, Avatar } from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import LikesModal from '../likes/LikesModal';
import { fetchPostsService } from '../../redux/services/postPageService';
import './PostPage.css';  // Thêm file CSS riêng

const { Content } = Layout;

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [likedBy, setLikedBy] = useState([]);

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         const data = await fetchPostsService();
    //         setPosts(data);
    //     };
    //
    //     fetchPosts();
    // }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await fetchPostsService();
            console.log('Fetched posts:', data); // Kiểm tra dữ liệu nhận được
            setPosts(data);
        };

        fetchPosts();
    }, []);

    const showCreatePostModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const showLikesModal = (likedBy) => {
        setLikedBy(likedBy);
        setIsLikesModalVisible(true);
    };

    const handleLikesModalCancel = () => {
        setIsLikesModalVisible(false);
    };

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '24px', margin: '0 auto', maxWidth: '1200px' }}>
                <div className="create-post-container">
                    <Avatar
                        src=".fhan17-1.fna&amp;oh=00_AYBCRher2NmxkyJLeMbl1bogimlscT7TTop5ZXi7NpUMew&amp;oe=66BFC073"
                        size={40}
                    />
                    <Button type="primary" onClick={showCreatePostModal} className="create-post-button">
                        Tạo bài viết
                    </Button>
                </div>

                <div className="post-page">
                    {posts.length > 0 ? (
                        posts.map(post => (
                            <Post
                                key={post.id}
                                post={post}
                                onLikesClick={() => showLikesModal(post.likedBy)}
                            />
                        ))
                    ) : (
                        <p>Không có bài viết nào để hiển thị.</p>
                    )}
                </div>

                <CreatePostModal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                />

                <LikesModal
                    visible={isLikesModalVisible}
                    onCancel={handleLikesModalCancel}
                    likedBy={likedBy}
                />
            </Content>
        </Layout>
    );
};

export default PostPage;



