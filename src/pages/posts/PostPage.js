// import React, { useEffect, useState } from 'react';
// import Post from './Post';
// import {fetchPostsService} from '../../redux/services/postPageService'
// const PostPage = () => {
//     const [posts, setPosts] = useState([]);
//
//     useEffect(() => {
//         const fetchPosts = async () => {
//             const data = await fetchPostsService();
//             setPosts(data);
//         };
//
//         fetchPosts();
//     }, []);
//
//     return (
//         <div className="post-page">
//             {posts.length > 0 ? (
//                 posts.map(post => (
//                     <Post key={post.id} post={post} />
//                 ))
//             ) : (
//                 <p>Không có bài viết nào để hiển thị.</p>
//             )}
//         </div>
//     );
// };
//
// export default PostPage;


import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Avatar } from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import LikesModal from '../likes/LikesModal';
import { fetchPostsService } from '../../redux/services/postPageService';
import './PostPage.css';  // Thêm file CSS riêng

const { Content } = Layout;
const { Title } = Typography;

const PostPage = () => {
    const [posts, setPosts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [likedBy, setLikedBy] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await fetchPostsService();
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
                        src="https://ddk.1cdn.vn/2023/01/01/image.daidoanket.vn-images-upload-01012023-_dodo_1_4132cf89_980a7c75.jpg"
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
