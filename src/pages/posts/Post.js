<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Input, List, Modal, Avatar } from 'antd';
import { LikeOutlined, LikeFilled, MoreOutlined, CommentOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPostModal from "./EditPostModal";
import './Post.css';
=======
import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Dropdown, Input, List, Menu, Modal, Typography} from 'antd';
import {CommentOutlined, LikeFilled, LikeOutlined, MoreOutlined} from '@ant-design/icons';
import './Post.css';
import EditPostModal from './EditPostModal';
import LikesModal from '../likes/LikesModal';
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, updatePost} from "../../redux/services/postService";
import {compressAndEncodeImageFile} from "../../EncodeDecodeImage/compressAndEncodeImageFile"; // Nhập modal danh sách người thích
>>>>>>> master

const {Title, Text} = Typography;
const {TextArea} = Input;

<<<<<<< HEAD
const DEFAULT_AVATAR = 'https://ddk.1cdn.vn/2023/01/01/image.daidoanket.vn-images-upload-01012023-_dodo_1_4132cf89_980a7c75.jpg';
const POST_IMAGE = 'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/8/29/1086521/Antony.jpeg';
const DEFAULT_NAME = 'Cristiano Ronaldo';

const Post = ({ post }) => {
=======
const Post = ({post, avatarImage}) => {
>>>>>>> master
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments ? post.comments.map(c => c.content) : []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
<<<<<<< HEAD
    const [liked, setLiked] = useState(post.likes && post.likes.length > 0);

    const [zoomLevel, setZoomLevel] = useState(1); // Kích thước ảnh khởi tạo là 1x
=======
    const [liked, setLiked] = useState(false); // Trạng thái thích bài viết
    const [decodeImages, setDecodeImages] = useState([]);
    const profile = useSelector(({ profiles }) => profiles.profile);
    const dispatch = useDispatch();
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const id = post.id;

    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const postList = post.postImages;
                const decodeImageList = postList && postList.length > 0
                    ? await Promise.all(postList.map(async (post) => {
                        return decodeAndDecompressImageFile(decodeURIComponent(post.image));
                    }))
                    : [];
                setDecodeImages(decodeImageList);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };
        fetchDecodedImages();
    }, [post.postImages]);
>>>>>>> master

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    const handleLikeClick = () => {
        setLiked(!liked);
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

<<<<<<< HEAD
=======
    const handleEditPost = async (updatedPost) => {
        const urlToFile = async (url, filename) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], filename, { type: blob.type });
            return file;
        };
        const listImage = await Promise.all(updatedPost.image.map(async (imageUrl, index) => {
            return await urlToFile(imageUrl, `image-${index}.jpg`); // Bạn có thể thay đổi đuôi file hoặc tên tùy theo yêu cầu
        }));
        const postImages = listImage ? await Promise.all(listImage.map(async (file) => {
            return await compressAndEncodeImageFile(file);
        })) : [];
        const posts = {
            email:email,
            content:updatedPost.content,
            postImages:postImages,
            postStatus:updatedPost.visibility
        }
        dispatch(updatePost({post:posts,id}));
        setIsEditModalVisible(false);
    };

    const handleLikeClick = () => {
        setLiked(!liked); // Đảo trạng thái thích
    };

>>>>>>> master
    const handleCancel = () => {
        setIsModalVisible(false);
        setIsLikesModalVisible(false);
        setIsEditModalVisible(false);
        setZoomLevel(1); // Khôi phục kích thước ảnh khi đóng modal
    };

<<<<<<< HEAD
    // Xử lý phóng to và thu nhỏ ảnh
    const zoomIn = () => {
        setZoomLevel(prevLevel => prevLevel + 0.1); // Tăng kích thước ảnh
=======
    const handleMenuClick = (e) => {
        if (e.key === '1') {
            showEditModal();
        } else if (e.key === '2') {
            dispatch(deletePost(post.id));
        }
>>>>>>> master
    };

    const zoomOut = () => {
        setZoomLevel(prevLevel => Math.max(0.5, prevLevel - 0.1)); // Giảm kích thước ảnh
    };

    return (
        <div>
            <Card className="post-card">
                <div className="post-header">
<<<<<<< HEAD
                    <Avatar src={DEFAULT_AVATAR} />
                    <Title level={4} style={{ marginLeft: 10 }}>
                        {DEFAULT_NAME}
                    </Title>
                    <Button
                        className="more-options-button"
                        onClick={showEditModal}
                        icon={<MoreOutlined />}
                    />
                </div>
                <Text>{post.content}</Text>
                {POST_IMAGE && (
                    <div className="post-image-container">
                        <img
                            src={POST_IMAGE}
                            alt="Post"
                            className="post-image"
                            style={{ transform: `scale(${zoomLevel})` }} // Áp dụng phép biến đổi phóng to
                            onClick={showPostModal} // Mở modal khi click vào ảnh
                        />
                    </div>
                )}
                <Text type="secondary">Ngày tạo: {new Date(post.createdAt).toLocaleDateString()}</Text>
                {post.updatedAt && <Text type="secondary">Cập nhật: {new Date(post.updatedAt).toLocaleDateString()}</Text>}
                <Text type="secondary">Trạng thái: {post.postStatus}</Text>
                <Text type="secondary">ID: {post.id}</Text>

                <div onClick={showLikesModal} className="post-stats">
                    {liked ? (
                        <>
                            <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes ? post.likes.length + 1 : 1} lượt thích
                        </>
                    ) : (
                        <>
                            <LikeOutlined style={{ marginRight: 8 }} /> {post.likes ? post.likes.length : 0} lượt thích
                        </>
                    )}
                </div>
                <div className="post-actions">
                    <Button
                        className={`post-action-button ${liked ? 'liked' : 'unliked'}`} // Thay đổi lớp CSS dựa trên trạng thái
                        icon={liked ? <LikeFilled /> : <LikeOutlined />}
=======
                    <Avatar src={avatarImage}/>
                    <div>
                        <Title level={4} style={{marginLeft: 10}}>
                            {profile.firstName + " " + profile.lastName}
                        </Title>
                        <Text className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
                    </div>

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
                {/*<div className="post-stats" onClick={showLikesModal}>*/}
                {/*    {liked ? (*/}
                {/*        <>*/}
                {/*            <LikeFilled style={{marginRight: 8, color: '#1890ff'}}/> {post.likes + 1} lượt thích*/}
                {/*        </>*/}
                {/*    ) : (*/}
                {/*        <>*/}
                {/*            <LikeOutlined style={{marginRight: 8}}/> {post.likes} lượt thích*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*</div>*/}
                <div className="post-actions">
                    <Button
                        className="post-action-button"
                        icon={liked ? <LikeFilled/> : <LikeOutlined/>}
>>>>>>> master
                        onClick={handleLikeClick}
                    >
                        {liked ? 'Đã thích' : 'Thích'}
                    </Button>
<<<<<<< HEAD

                    <Button className="post-action-button" icon={<CommentOutlined />} onClick={showPostModal}>
=======
                    <Button className="post-action-button" icon={<CommentOutlined/>} onClick={showPostModal}>
>>>>>>> master
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
                styles={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} // Căn giữa nội dung
            >
                <Card className="post-card">
                    <div className="post-header">
<<<<<<< HEAD
                        <Avatar src={DEFAULT_AVATAR}/>
                        <Title level={4} style={{ marginLeft: 10 }}>
                            {DEFAULT_NAME}
                        </Title>
                    </div>
                    <Text>{post.content}</Text>
                    {POST_IMAGE && (
                        <div className="post-image-container">
                            <img
                                src={POST_IMAGE}
                                alt="Post"
                                className="post-image"
                                style={{ transform: `scale(${zoomLevel})` }} // Áp dụng phép biến đổi phóng to
                            />
                            <div className="zoom-controls">
                                <Button icon={<PlusOutlined />} onClick={zoomIn} />
                                <Button icon={<MinusOutlined />} onClick={zoomOut} />
                            </div>
                        </div>
                    )}
                    <Text type="secondary">Ngày tạo: {new Date(post.createdAt).toLocaleDateString()}</Text>
                    {post.updatedAt && <Text type="secondary">Cập nhật: {new Date(post.updatedAt).toLocaleDateString()}</Text>}
                    <Text type="secondary">Trạng thái: {post.postStatus}</Text>

                    <div onClick={showLikesModal} className="post-stats">
                        {liked ? (
                            <>
                                <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes ? post.likes.length + 1 : 1} lượt thích
                            </>
                        ) : (
                            <>
                                <LikeOutlined style={{ marginRight: 8 }} /> {post.likes ? post.likes.length : 0} lượt thích
                            </>
                        )}
                    </div>
=======
                        <Avatar src={avatarImage}/>
                            <Title level={4} style={{marginLeft: 10}}>
                                {profile.firstName + " " + profile.lastName}
                            </Title>
                        <div>
                            <Text className="post-date">
                                {new Date(post.createdAt).toLocaleDateString()}
                            </Text>
                        </div>
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
                    {/*<div className="post-stats">*/}
                    {/*    {liked ? (*/}
                    {/*        <>*/}
                    {/*            <LikeFilled style={{marginRight: 8, color: '#1890ff'}}/> {post.likes + 1} lượt thích*/}
                    {/*        </>*/}
                    {/*    ) : (*/}
                    {/*        <>*/}
                    {/*            <LikeOutlined style={{marginRight: 8}}/> {post.likes} lượt thích*/}
                    {/*        </>*/}
                    {/*    )}*/}
                    {/*</div>*/}
>>>>>>> master
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

            <Modal
                title="Những người đã thích"
                visible={isLikesModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={400}
            >
            </Modal>

            <EditPostModal
                visible={isEditModalVisible}
                onCancel={handleCancel}
                post={post}
<<<<<<< HEAD
=======
                onEdit={handleEditPost}
                avatarImage={avatarImage}
>>>>>>> master
            />
        </div>
    );
};

export default Post;






