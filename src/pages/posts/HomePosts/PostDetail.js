import React, {useState, useEffect} from 'react';
import {Avatar, Button, Card, Dropdown, Input, List, Menu, Modal, Typography} from 'antd';
import {CommentOutlined, LikeFilled, LikeOutlined, MoreOutlined} from '@ant-design/icons';
import {decodeAndDecompressImageFile} from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {compressAndEncodeImageFile} from "../../../EncodeDecodeImage/compressAndEncodeImageFile";
import {useDispatch, useSelector} from "react-redux";
import {deletePost, likePost, unLikePost, updatePost} from "../../../redux/services/postService";
import LikesModal from "../../likes/LikesModal";
import EditPostModal from "./EditPostHomeModal/EditPostHomeModal";
import './PostDetail.css';

const {Title, Text} = Typography;
const {TextArea} = Input;

const PostDetail = ({post, likedPosts, onLikeClick, onCommentClick}) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments || []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [liked, setLiked] = useState(likedPosts.has(post.id));
    const [decodeImages, setDecodeImages] = useState([]);
    const dispatch = useDispatch();
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const id = post.id;
    const myId = JSON.parse(localStorage.getItem('currentUser')).id;
    const profile = useSelector(({profiles}) => profiles.profile);
    useEffect(() => {
        if (post.likes && myId) {
            // Kiểm tra xem email của người dùng hiện tại có trong danh sách likes không
            const userHasLiked = post.likes.some(like => like.userId === myId);
            setLiked(userHasLiked);
        }
    }, [post.likes, myId]);

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

    const handleEditPost = async (updatedPost) => {
        const urlToFile = async (url, filename) => {
            const response = await fetch(url);
            const blob = await response.blob();
            const file = new File([blob], filename, {type: blob.type});
            return file;
        };
        const listImage = await Promise.all(updatedPost.image.map(async (imageUrl, index) => {
            return await urlToFile(imageUrl, `image-${index}.jpg`);
        }));
        const postImages = listImage ? await Promise.all(listImage.map(async (file) => {
            return await compressAndEncodeImageFile(file);
        })) : [];
        const posts = {
            email: email,
            content: updatedPost.content,
            postImages: postImages,
            postStatus: updatedPost.visibility
        };
        dispatch(updatePost({post: posts, id}));
        setIsEditModalVisible(false);
    };

    const handleLikeClick = async () => {
        try {
            if (liked) {
                // Nếu đã like, gọi API để xóa like
                const like = post.likes.find(like => like.userId === myId);
                const likeId = like ? like.id : null; // Trả về `null` nếu không tìm thấy like
                await dispatch(unLikePost(likeId));
            } else {
                const like ={
                    userId:myId,
                    firstName:profile.firstName,
                    lastName:profile.lastName,
                    postId:post.id
                }
                await dispatch(likePost(like));
            }
            setLiked(!liked); // Cập nhật trạng thái liked sau khi gọi API
        } catch (error) {
            console.error('Error handling like:', error);
        }
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
            <Menu.Item key="1" icon={<MoreOutlined/>}>Sửa bài viết</Menu.Item>
            <Menu.Item key="2" icon={<MoreOutlined/>}>Xóa bài viết</Menu.Item>
        </Menu>
    );

    return (
        <div>
            <h1>PostDetail</h1>
            <Card className="post-card">
                <div className="post-header">
                    <Avatar src={decodeAndDecompressImageFile(decodeURIComponent(post.imageAvatar))}/>
                    <div>
                        <Title level={4} style={{marginLeft: 10}}>
                            {post.firstName} {post.lastName}
                        </Title>
                        <Text className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
                    </div>
                    {email === post.email && (
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                            <Button className="more-options-button" onClick={(e) => e.preventDefault()}>
                                <MoreOutlined/>
                            </Button>
                        </Dropdown>
                    )}
                </div>

                <Text>{post.content}</Text>

                <div className="post-images">
                    {decodeImages && decodeImages.length > 0 && (
                        <div className="post-images">
                            {decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                    onClick={() => showPostModal()}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="post-detail-like-count-container" onClick={() => showLikesModal(post.likes)}>
                    {post.likes && post.likes.length > 0 ? (
                        <>
                            <LikeFilled style={{marginRight: 8, color: '#1890ff'}}/> {post.likes.length} lượt thích
                        </>
                    ) : (
                        <>
                            <LikeOutlined style={{marginRight: 8}}/> 0 lượt thích
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
                    <Button
                        className="post-action-button"
                        icon={<CommentOutlined/>}
                        onClick={showPostModal}
                    >
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
                        <Avatar src={decodeAndDecompressImageFile(decodeURIComponent(post.imageAvatar))}/>
                        <Title level={4} style={{marginLeft: 10}}>
                            {post.firstName} {post.lastName}
                        </Title>
                        <Text className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
                    </div>

                    <Text>{post.content}</Text>

                    <div className="post-images">
                        {decodeImages && decodeImages.length > 0 ? (
                            decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="post-image"
                                    onClick={() => showPostModal()}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                    <div className="post-detail-like-count-container"
                         onClick={() => showLikesModal(post.likes)}>
                        {post.likes && post.likes.length > 0 ? (
                            <>
                                <LikeFilled style={{marginRight: 8, color: '#1890ff'}}/> {post.likes.length} lượt thích
                            </>
                        ) : (
                            <>
                                <LikeOutlined style={{marginRight: 8}}/> 0 lượt thích
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
                likes={post.likes || []}
                avatar={post.imageAvatar}
            />

            <EditPostModal
                visible={isEditModalVisible}
                onCancel={handleCancel}
                onSave={handleEditPost}
                post={post}
            />
        </div>
    );
};

export default PostDetail;
