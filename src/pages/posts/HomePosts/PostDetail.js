import React, {useState, useEffect, useRef} from 'react';
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

const PostDetail = ({post, likedPosts}) => {
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
                const like = {
                    userId: myId,
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    postId: post.id
                }
                await dispatch(likePost(like));
            }
            setLiked(!liked); // Cập nhật trạng thái liked sau khi gọi API
        } catch (error) {
            console.error('Error handling like:', error);
        }
    };

    const handleCancel = () => {
        setIsOpen(false)
        setReplyingTo(null)
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

    const [isOpen, setIsOpen] = useState(false);

    const toggleChildren = () => {
        setIsOpen(!isOpen);
    };

    const [replyingTo, setReplyingTo] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const replyInputRef = useRef(null);
    const handleReply = (commentId) => {
        setReplyingTo(commentId);
        setTimeout(() => {
            replyInputRef.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
            replyInputRef.current?.focus();
        }, 10);
    };

    const handleReplyChange = (e) => {
        setReplyContent(e.target.value);
    };

    const handleReplySubmit = (commentId) => {
        // Xử lý logic gửi bình luận con ở đây
        console.log(`Replying to comment ${commentId}: ${replyContent}`);
        setSelectedReplyImages([])
        setReplyContent('');
        setReplyingTo(null);
    };
    const [selectedReplyImages, setSelectedReplyImages] = useState([]); // Lưu trữ ảnh đã chọn
    const [selectedReplyImages2, setSelectedReplyImages2] = useState([]); // Lưu trữ ảnh đã chọn

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setSelectedReplyImages(prevImages => [...prevImages, ...files]);
    };

    const handleImageUpload2 = (event) => {
        const files = Array.from(event.target.files);
        setSelectedReplyImages2(prevImages => [...prevImages, ...files]);
    };

    const handleRemoveImage = (index) => {
        setSelectedReplyImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleRemoveImage2 = (index) => {
        setSelectedReplyImages2(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div>
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
                        {post.comments && post.comments.length > 0 ? (
                            <List
                                dataSource={post.comments}
                                renderItem={item => (
                                    <List.Item key={item.id} style={{display: 'block', marginBottom: '15px'}}>
                                        <List.Item.Meta
                                            avatar={<Avatar
                                                src={decodeAndDecompressImageFile(decodeURIComponent(item.imageAvatar))}/>}
                                            title={`${item.firstName} ${item.lastName}`}
                                            description={item.content}
                                        />
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <Button type="link" onClick={() => handleReply(item.id)}
                                                    style={{fontSize: '12px'}}>
                                                Trả lời
                                            </Button>
                                            {item.commentChildren && item.commentChildren.length > 0 && (
                                                <Button type="link" onClick={toggleChildren} style={{fontSize: '12px'}}>
                                                    {isOpen ? 'Ẩn bình luận con' : 'Hiển thị bình luận con'}
                                                </Button>
                                            )}
                                        </div>
                                        {isOpen && item.commentChildren && item.commentChildren.length > 0 && (
                                            <List
                                                dataSource={item.commentChildren}
                                                renderItem={child => (
                                                    <List.Item key={child.id} style={{
                                                        paddingLeft: '20px',
                                                        display: 'block',
                                                        marginTop: '10px'
                                                    }}>
                                                        <List.Item.Meta
                                                            avatar={<Avatar
                                                                src={decodeAndDecompressImageFile(decodeURIComponent(child.imageAvatar))}/>}
                                                            title={`${child.firstName} ${child.lastName}`}
                                                            description={child.content}
                                                        />
                                                    </List.Item>
                                                )}
                                                bordered={false}
                                            />
                                        )}
                                        {replyingTo === item.id && (
                                            <>
                                                <div ref={replyInputRef}
                                                     style={{marginTop: '10px', position: 'relative'}}>
                                                    <Input.TextArea
                                                        value={replyContent}
                                                        onChange={handleReplyChange}
                                                        rows={2}
                                                        placeholder="Nhập bình luận của bạn"
                                                        style={{paddingRight: '40px'}} // Tạo khoảng trống cho nút ảnh
                                                    />
                                                    <label htmlFor="image-upload" style={{
                                                        position: 'absolute',
                                                        right: '10px',
                                                        top: '30px',
                                                        transform: 'translateY(-50%)',
                                                        cursor: 'pointer',
                                                        fontSize: '20px',
                                                        color: '#1890ff'
                                                    }}>
                                                        📷
                                                        <input
                                                            id="image-upload"
                                                            type="file"
                                                            accept="image/*"
                                                            multiple
                                                            onChange={handleImageUpload}
                                                            style={{display: 'none'}}
                                                        />
                                                    </label>
                                                </div>

                                                <Button
                                                    type="primary"
                                                    onClick={() => handleReplySubmit(item.id)}
                                                    style={{marginTop: '5px'}}
                                                >
                                                    Gửi
                                                </Button>
                                                <div style={{marginTop: '10px', display: 'flex', flexWrap: 'wrap'}}>
                                                    {selectedReplyImages.map((image, index) => (
                                                        <div key={index}
                                                             style={{
                                                                 position: 'relative',
                                                                 marginRight: '5px',
                                                                 marginBottom: '5px'
                                                             }}>
                                                            <img
                                                                src={URL.createObjectURL(image)}
                                                                alt={`selected ${index}`}
                                                                style={{
                                                                    width: '100px',
                                                                    height: '100px',
                                                                    objectFit: 'cover',
                                                                    borderRadius: '5px'
                                                                }}
                                                            />
                                                            <button
                                                                onClick={() => handleRemoveImage(index)} // Hàm xử lý khi nhấn nút x
                                                                style={{
                                                                    position: 'absolute',
                                                                    top: '5px',
                                                                    right: '5px',
                                                                    background: 'rgba(0, 0, 0, 0.5)',
                                                                    color: 'white',
                                                                    border: 'none',
                                                                    borderRadius: '50%',
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    alignItems: 'center',
                                                                    fontSize: '12px',
                                                                    lineHeight: '1'
                                                                }}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </List.Item>
                                )}
                            />
                        ) : (
                            <p>Không có bình luận nào.</p>
                        )}

                        <div style={{position: 'relative'}}>
                            <Input.TextArea
                                rows={4}
                                value={newComment}
                                onChange={handleCommentChange}
                                placeholder="Viết bình luận..."
                                style={{paddingRight: '40px', resize: 'none'}} // Tạo khoảng trống cho nút ảnh
                            />
                            <label htmlFor="comment-image-upload" style={{
                                position: 'absolute',
                                right: '10px',
                                bottom: '10px',
                                top: '20px',
                                cursor: 'pointer',
                                fontSize: '20px',
                                color: '#1890ff',
                                display: 'flex',
                                alignItems: 'center'
                            }}>
                                📷
                                <input
                                    id="comment-image-upload"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload2}
                                    style={{display: 'none'}}
                                />
                            </label>
                        </div>

                        <Button
                            type="primary"
                            onClick={handleCommentSubmit}
                            style={{marginTop: 10}}
                        >
                            Gửi
                        </Button>
                        <div style={{marginTop: '10px', display: 'flex', flexWrap: 'wrap'}}>
                            {selectedReplyImages2.map((image, index) => (
                                <div key={index}
                                     style={{position: 'relative', marginRight: '5px', marginBottom: '5px'}}>
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt={`selected ${index}`}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                            borderRadius: '5px'
                                        }}
                                    />
                                    <button
                                        onClick={() => handleRemoveImage2(index)} // Hàm xử lý khi nhấn nút x
                                        style={{
                                            position: 'absolute',
                                            top: '5px',
                                            right: '5px',
                                            background: 'rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '20px',
                                            height: '20px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            fontSize: '12px',
                                            lineHeight: '1'
                                        }}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>

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
                onEdit={handleEditPost}
                post={post}
            />
        </div>
    );
};

export default PostDetail;
