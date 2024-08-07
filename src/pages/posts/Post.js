import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Input, List } from 'antd';
import './Post.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Post = ({ post }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([ // Add initial comments here if any
        'Great post!',
        'I totally agree!'
    ]);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    return (
        <Card className="post-card">
            <div className="post-header">
                <Avatar src={post.user.avatar} />
                <Title level={4} style={{ marginLeft: 10 }}>
                    {post.user.name}
                </Title>
            </div>
            <img src={post.image} alt="Post" className="post-image" />
            <Text>{post.status}</Text>
            <div className="post-actions">
                <Button className="post-action-button">Like {post.likes}</Button>
                <Button className="post-action-button">Comment {post.comments}</Button>
            </div>
            <div className="post-comments">
                <Title level={4}>Comments:</Title>
                <List
                    dataSource={comments}
                    renderItem={item => (
                        <List.Item>{item}</List.Item>
                    )}
                />
                <TextArea
                    rows={4}
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Write a comment..."
                />
                <Button
                    type="primary"
                    onClick={handleCommentSubmit}
                    style={{ marginTop: 10 }}
                >
                    Submit
                </Button>
            </div>
        </Card>
    );
};

export default Post;
