import React, {useEffect, useState} from 'react';
import {Card, Avatar, Typography, Button, Input, List, Modal, Dropdown, Menu} from 'antd';
import {LikeOutlined, LikeFilled, CommentOutlined, MoreOutlined} from '@ant-design/icons';
import './Post.css';
import EditPostModal from './EditPostModal';
import LikesModal from '../likes/LikesModal';
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {useDispatch} from "react-redux";
import {deletePost, getPostByUserId} from "../../redux/services/postService"; // Nhập modal danh sách người thích

const {Title, Text} = Typography;
const {TextArea} = Input;

const Post = ({post, avatarImage}) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [liked, setLiked] = useState(false); // Trạng thái thích bài viết
    const [decodeImages, setDecodeImages] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const postList = post.postImages;
                const decodeImageList = postList && postList.length > 0
                    ? await Promise.all(postList.map(async (post) => {
                        return await decodeAndDecompressImageFile(decodeURIComponent(post.image));
                    }))
                    : [];
                setDecodeImages(decodeImageList);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };
        fetchDecodedImages();
    }, [post.postImages]);

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
            dispatch(deletePost(post.id));
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
                    <Avatar src={avatarImage}/>
                    <Title level={4} style={{marginLeft: 10}}>
                        {post.firstName + " " + post.lastName}
                    </Title>
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                        <Button
                            className="more-options-button"
                            onClick={(e) => e.preventDefault()}
                        >
                            <MoreOutlined/>
                        </Button>
                    </Dropdown>
                </div>
                <div className="post-images">
                    {decodeImages && decodeImages.length > 0 && (
                        <div className="post-images">
                            {decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                    onClick={() => showPostModal(image)} // Call showPostModal with the image URL
                                />
                            ))}
                        </div>
                    )}
                </div>
                <Text>{post.content}</Text>
                <div className="post-stats" onClick={showLikesModal}>
                    {liked ? (
                        <>
                            <LikeFilled style={{marginRight: 8, color: '#1890ff'}}/> {post.likes + 1} lượt thích
                        </>
                    ) : (
                        <>
                            <LikeOutlined style={{marginRight: 8}}/> {post.likes} lượt thích
                        </>
                    )}
                </div>
                <div className="post-actions">
                    <Button
                        className="post-action-button"
                        icon={liked ? <LikeFilled/> : <LikeOutlined/>}
                        onClick={handleLikeClick}
                    >
                        {liked ? 'Đã thích' : 'Thích'}
                    </Button>
                    <Button className="post-action-button" icon={<CommentOutlined/>} onClick={showPostModal}>
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
                        <Avatar src={avatarImage}/>
                        <Title level={4} style={{marginLeft: 10}}>
                            {post.firstName + " " + post.lastName}
                        </Title>
                    </div>
                    <div className="post-images">
                        {decodeImages && decodeImages.length > 0 ? (
                            decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                    onClick={() => showPostModal(image)} // Call showPostModal with the image URL
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <Text>{post.content}</Text>
                    <div className="post-stats">
                        {liked ? (
                            <>
                                <LikeFilled style={{marginRight: 8, color: '#1890ff'}}/> {post.likes + 1} lượt thích
                            </>
                        ) : (
                            <>
                                <LikeOutlined style={{marginRight: 8}}/> {post.likes} lượt thích
                            </>
                        )}
                    </div>
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
                            style={{marginTop: 10}}
                        >
                            Gửi
                        </Button>
                    </div>
                </Card>
            </Modal>

            <LikesModal
                visible={isLikesModalVisible}
                onCancel={handleCancel}
                likedBy={post.likedBy} // Cung cấp danh sách người thích bài viết
            />

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
