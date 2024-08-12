import React, { useState } from 'react';
import { Layout, Typography, Button, Avatar } from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import LikesModal from '../likes/LikesModal';
import './PostPage.css';  // Thêm file CSS riêng

const { Content } = Layout;
const { Title } = Typography;

const PostsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [likedBy, setLikedBy] = useState([]);

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

    const posts = [
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: [
                { name: 'Alice', avatar: 'https://example.com/avatar-alice.jpg' },
                { name: 'Bob', avatar: 'https://example.com/avatar-bob.jpg' },
                { name: 'Charlie', avatar: 'https://example.com/avatar-charlie.jpg' }
            ],
            comments: 34
        },
        // Thêm các bài viết khác
    ];

    return (
        <Layout style={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Content style={{ padding: '24px', margin: '0 auto', maxWidth: '1200px' }}>
                <div className="create-post-container">
                    <Avatar
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/429973265_3120961174703167_3477680488109187875_n.jpg?stp=cp6_dst-jpg_p120x120&amp;_nc_cat=105&amp;ccb=1-7&amp;_nc_sid=0ecb9b&amp;_nc_eui2=AeF8CENiz_FCiIt_VWUzO5Cn9HpSCSthZiz0elIJK2FmLIyntBL90scrPNG8x_VhvXRSMTGf-DHYubgpmTJni4y5&amp;_nc_ohc=dhiUVYZgqzgQ7kNvgFAK1vx&amp;_nc_ht=scontent.fhan17-1.fna&amp;oh=00_AYBCRher2NmxkyJLeMbl1bogimlscT7TTop5ZXi7NpUMew&amp;oe=66BFC073"
                        size={40}
                    />
                    <Button type="primary" onClick={showCreatePostModal} className="create-post-button">
                        Tạo bài viết
                    </Button>
                </div>

                {posts.map((post, index) => (
                    <Post
                        key={index}
                        post={post}
                        onLikesClick={() => showLikesModal(post.likedBy)}
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
