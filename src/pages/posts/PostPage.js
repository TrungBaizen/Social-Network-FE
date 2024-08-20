import React, {useEffect, useState} from 'react';
import {Avatar, Button, Layout, Typography} from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import LikesModal from '../likes/LikesModal';
import './PostPage.css';
import {useDispatch, useSelector} from "react-redux";
import {getPostByUserId} from "../../redux/services/postService";
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile"; // Thêm file CSS riêng

const { Content } = Layout;
const { Title } = Typography;

const PostsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [likedBy, setLikedBy] = useState([]);
    const dispatch = useDispatch();
    const id = JSON.parse(localStorage.getItem('currentUser')).id;
    const posts = useSelector(({ posts }) => posts.list);
    const profile = useSelector(({ profiles }) => profiles.profile);
    const [avatarImage, setAvatarImage] = useState('');
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

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '24px', margin: '0 auto', maxWidth: '1200px' }}>
                <div className="create-post-container">
                    <Avatar
                        src={avatarImage}
                        size={40}
                    />
                    <Button type="primary" onClick={showCreatePostModal} className="create-post-button">
                        Tạo bài viết
                    </Button>
                </div>

                {posts.map((post, index ) => (
                    <Post
                        key={index}
                        post={post}
                        onLikesClick={() => showLikesModal(post.likedBy)}
                        avatarImage={avatarImage}
                    />
                ))}

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

export default PostsPage;
