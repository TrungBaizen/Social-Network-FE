import React, { useState, useEffect } from 'react';
import { Avatar, Card, Typography } from 'antd';
import { LikeFilled, LikeOutlined } from '@ant-design/icons';
import './SearchPost.css';

const { Title, Text } = Typography;

const SearchPost = ({ post }) => {
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked); // Toggle like state
    };

    return (
        <Card className="search-post-card">
            <div className="search-post-header">
                <Avatar src={post.avatarImage || 'https://randomuser.me/api/portraits/men/1.jpg'} />
                <Title level={4} style={{ marginLeft: 10 }}>
                    {post.authorName}
                </Title>
            </div>
            <div className="search-post-content">
                <Text>{post.content}</Text>
                <div className="search-post-images">
                    {post.images && post.images.length > 0 ? (
                        post.images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Post Image ${index + 1}`}
                                className="search-post-image"
                            />
                        ))
                    ) : (
                        <p>Không có ảnh nào.</p>
                    )}
                </div>
            </div>
            <div className="search-post-stats">
                {liked ? (
                    <>
                        <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes + 1} lượt thích
                    </>
                ) : (
                    <>
                        <LikeOutlined style={{ marginRight: 8 }} /> {post.likes} lượt thích
                    </>
                )}
            </div>
            <button className="like-button" onClick={handleLikeClick}>
                {liked ? 'Đã thích' : 'Thích'}
            </button>
        </Card>
    );
};

export default SearchPost;
