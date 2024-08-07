import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Input, List, Modal } from 'antd';
import { LikeOutlined, CommentOutlined } from '@ant-design/icons';
import './Post.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const Post = ({ post }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([
        'Great post!',
        'I totally agree!'
    ]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const showPostModal = () => {
        setIsModalVisible(true);
    };

    const showLikesModal = () => {
        setIsLikesModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsLikesModalVisible(false);
    };

    return (
        <div>
            <Card className="post-card">
                <div className="post-header">
                    <Avatar src={post.user.avatar} />
                    <Title level={4} style={{ marginLeft: 10 }}>
                        {post.user.name}
                    </Title>
                </div>
                <img src={post.image} alt="Post" className="post-image" onClick={showPostModal} />
                <div className="post-stats" onClick={showLikesModal}>
                    <LikeOutlined style={{ marginRight: 8 }} /> {post.likes} lượt thích
                </div>
                <Text>{post.status}</Text>
                <div className="post-actions">
                    <Button className="post-action-button" icon={<LikeOutlined />}>Thích</Button>
                    <Button className="post-action-button" icon={<CommentOutlined />} onClick={showPostModal}>Bình luận</Button>
                </div>
            </Card>

            <Modal
                title="Chi tiết bài đăng"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800} // Mở rộng kích thước modal
            >
                <Card className="post-card">
                    <div className="post-header">
                        <Avatar src={post.user.avatar} />
                        <Title level={4} style={{ marginLeft: 10 }}>
                            {post.user.name}
                        </Title>
                    </div>
                    <img src={post.image} alt="Post" className="post-image" />
                    <div className="post-stats">
                        <LikeOutlined style={{ marginRight: 8 }} /> {post.likes} lượt thích
                    </div>
                    <Text>{post.status}</Text>
                    <div className="post-comments">
                        <Title level={4}>Bình luận:</Title>
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
                            placeholder="Viết bình luận..."
                        />
                        <Button
                            type="primary"
                            onClick={handleCommentSubmit}
                            style={{ marginTop: 10 }}
                        >
                            Gửi
                        </Button>
                    </div>
                </Card>
            </Modal>

            <Modal
                title="Những người đã thích bài đăng"
                visible={isLikesModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={400} // Kích thước nhỏ hơn
            >
                <List
                    dataSource={post.likedBy}
                    renderItem={item => (
                        <List.Item>
                            <LikeOutlined style={{ marginRight: 8 }} />
                            {item}
                        </List.Item>
                    )}
                />
            </Modal>
        </div>
    );
};

export default Post;
