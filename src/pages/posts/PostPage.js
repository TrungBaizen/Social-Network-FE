import React, { useState } from 'react';
import {Layout, Typography, Button  } from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import PostCreate from "./PostCreate/PostCreate";

const { Content } = Layout;
const { Title } = Typography;

const PostsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showCreatePostModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
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
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },{
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },{
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },{
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },{
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },
        {
            user: {
                name: 'Jane Smith',
                avatar: 'https://freenice.net/wp-content/uploads/2021/08/hinh-anh-avatar-dep.jpg'
            },
            image: 'https://example.com/post-image2.jpg',
            likes: 85,
            likedBy: ['Dave', 'Eva'],
            comments: 12,
            status: 'Enjoyed a fantastic dinner!'
        }
    ];

    return (
        <Layout className="posts-page">
            <Content className="posts-content">
                <Button
                    type="primary"
                    onClick={showCreatePostModal}
                    className="create-post-button"
                >
                    Tạo bài viết
                </Button>
                <PostCreate/>
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
                <CreatePostModal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                />
            </Content>
        </Layout>
    );
};

export default PostsPage;