import React, { useEffect, useState } from 'react';
import { List, Card, Avatar, Typography, Button } from 'antd';
import { getPosts } from '../../../redux/services/postService'; // Nhập service để lấy danh sách bài viết
import Post from './Post'; // Nhập component Post

const { Title } = Typography;

const PostsHomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts(); // Lấy danh sách bài viết từ server
                setPosts(response.data); // Cập nhật trạng thái với dữ liệu bài viết
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className="posts-home">
            <Title level={2}>Các bài viết</Title>
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                }}
                dataSource={posts}
                renderItem={post => (
                    <List.Item
                        key={post.id}
                        extra={<Avatar src={post.avatarImage} />}
                    >
                        <Post post={post} avatarImage={post.avatarImage} />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default PostsHome;
