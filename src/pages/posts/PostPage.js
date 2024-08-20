<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Layout, Button, Avatar } from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import LikesModal from '../likes/LikesModal';
import { fetchPostsService } from '../../redux/services/postPageService';
import './PostPage.css';  // Thêm file CSS riêng
=======
import React, {useEffect, useState} from 'react';
import {Avatar, Button, Layout, Typography} from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import LikesModal from '../likes/LikesModal';
import './PostPage.css';
import {useDispatch, useSelector} from "react-redux";
import {getPostByUserId} from "../../redux/services/postService";
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile"; // Thêm file CSS riêng
>>>>>>> master

const { Content } = Layout;

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [likedBy, setLikedBy] = useState([]);
<<<<<<< HEAD

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

=======
    const dispatch = useDispatch();
    const id = JSON.parse(localStorage.getItem('currentUser')).id;
    const posts = useSelector(({ posts }) => posts.list);
    const profile = useSelector(({ profiles }) => profiles.profile);
    const [avatarImage, setAvatarImage] = useState('');
>>>>>>> master
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

<<<<<<< HEAD
=======

    useEffect(() => {
        dispatch(getPostByUserId(id))
    }, []);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (profile.imageAvatar) {
                    const decodeURL = decodeURIComponent(profile.imageAvatar);
                    const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                    setAvatarImage(imageUrl);
                } else {
                    setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
                }
            } catch (error) {
                console.error('Error decoding image:', error);
            }
        };
        if (profile) {
            fetchImage();
        }
    }, [profile]);


>>>>>>> master
    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '24px', margin: '0 auto', maxWidth: '1200px' }}>
                <div className="create-post-container">
                    <Avatar
<<<<<<< HEAD
                        src=".fhan17-1.fna&amp;oh=00_AYBCRher2NmxkyJLeMbl1bogimlscT7TTop5ZXi7NpUMew&amp;oe=66BFC073"
=======
                        src={avatarImage}
>>>>>>> master
                        size={40}
                    />
                    <Button type="primary" onClick={showCreatePostModal} className="create-post-button">
                        Tạo bài viết
                    </Button>
                </div>

<<<<<<< HEAD
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
=======
                {posts.map((post, index ) => (
                    <Post
                        key={index}
                        post={post}
                        onLikesClick={() => showLikesModal(post.likedBy)}
                        avatarImage={avatarImage}
                    />
                ))}
>>>>>>> master

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



