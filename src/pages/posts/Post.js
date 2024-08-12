import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Input, List, Modal, Dropdown, Menu } from 'antd';
import { LikeOutlined, CommentOutlined, MoreOutlined, LikeFilled } from '@ant-design/icons';
import './Post.css'; // Nhập tệp CSS
import EditPostModal from './EditPostModal'; // Nhập modal chỉnh sửa bài viết

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
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [liked, setLiked] = useState(false); // Trạng thái thích bài viết

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

    const showEditModal = () => {
        setIsEditModalVisible(true);
    };

    const handleEditPost = (updatedPost) => {
        console.log('Updated Post:', updatedPost);
        setIsEditModalVisible(false);
    };

    const handleLikeClick = () => {
        setLiked(!liked); // Đảo trạng thái thích
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsLikesModalVisible(false);
        setIsEditModalVisible(false);
    };

    const handleMenuClick = (e) => {
        if (e.key === '1') {
            showEditModal();
        } else if (e.key === '2') {
            // Xóa bài viết ở đây
            console.log('Xóa bài viết');
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Sửa bài viết</Menu.Item>
            <Menu.Item key="2">Xóa bài viết</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <Card className="post-card">
                <div className="post-header">
                    <Avatar src={post.user.avatar} />
                    <Title level={4} style={{ marginLeft: 10 }}>
                        {post.user.name}
                    </Title>
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <Button
                            className="more-options-button"
                            onClick={(e) => e.preventDefault()}
                        >
                            <span className="dots">...</span>
                        </Button>
                    </Dropdown>
                </div>
                <img src={post.image} alt="Post" className="post-image" onClick={showPostModal} />
                <div className="post-stats" onClick={showLikesModal}>
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
                <Text>{post.status}</Text>
                <div className="post-actions">
                    <Button
                        className="post-action-button"
                        icon={liked ? <LikeFilled /> : <LikeOutlined />}
                        onClick={handleLikeClick} // Thay đổi trạng thái thích khi nhấp
                    >
                        {liked ? 'Đã thích' : 'Thích'}
                    </Button>
                    <Button className="post-action-button" icon={<CommentOutlined />} onClick={showPostModal}>
                        Bình luận
                    </Button>
                </div>
            </Card>

            <Modal
                title="Chi tiết bài đăng"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={800}
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
                width={400}
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

            <EditPostModal
                visible={isEditModalVisible}
                onCancel={handleCancel}
                post={post}
                onEdit={handleEditPost}
            />
        </div>
    );
};

export default Post;
