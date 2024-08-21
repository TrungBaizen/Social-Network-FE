import React, {useEffect, useRef, useState} from 'react';
import {Avatar, Button, Card, Dropdown, Input, List, Menu, Modal, Typography} from 'antd';
import {CommentOutlined, LikeFilled, LikeOutlined, MoreOutlined} from '@ant-design/icons';
import './SearchPost.css';
import {decodeAndDecompressImageFile} from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {Link} from 'react-router-dom';
import LikesModal from "../../../pages/likes/LikesModal";
import EditPostModal from "../../../pages/posts/EditPostModal";
import {
    commentPost,
    deleteCommentPost,
    deletePost,
    likePost,
    unLikePost,
    updatePost
} from "../../../redux/services/postService";
import {useDispatch, useSelector} from "react-redux";
import {compressAndEncodeImageFile} from "../../../EncodeDecodeImage/compressAndEncodeImageFile";

const {Title, Text} = Typography;
const {TextArea} = Input;

const SearchPost = ({post}) => {
    const [avatarImage, setAvatarImage] = useState('');
    const [decodeImages, setDecodeImages] = useState([]);
    const [liked, setLiked] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [newComment, setNewComment] = useState('');
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;
    const myId = JSON.parse(localStorage.getItem('currentUser')).id;
    const dispatch = useDispatch();
    const profile = useSelector(({profiles}) => profiles.profile);
    const id = post.id;
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {
        const fetchImage = async () => {
            try {
                const imageUrl = post.imageAvatar
                    ? await decodeAndDecompressImageFile(decodeURIComponent(post.imageAvatar))
                    : "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg";
                setAvatarImage(imageUrl);
            } catch (error) {
                console.error('Error decoding image:', error);
            }
        };
        fetchImage();
    }, [post.imageAvatar]);

    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const decodeImageList = post.postImages
                    ? await Promise.all(post.postImages.map(async (postImage) =>
                        decodeAndDecompressImageFile(decodeURIComponent(postImage.image))
                    ))
                    : [];
                setDecodeImages(decodeImageList);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };
        fetchDecodedImages();
    }, [post.postImages]);

    useEffect(() => {
        if (post.likes && myId) {
            // Kiểm tra xem email của người dùng hiện tại có trong danh sách likes không
            const userHasLiked = post.likes.some(like => like.userId === myId);
            setLiked(userHasLiked);
        }
    }, [post.likes, myId]);

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

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = async () => {
        const imageComments = selectedReplyImages2 ? await Promise.all(selectedReplyImages2.map(async (file) => {
            return await compressAndEncodeImageFile(file);
        })) : [];
        const commentImages = imageComments.map(image => ({image}));
        const comment = {
            content: newComment,
            userId: myId,
            postId: post.id,
            commentImages: commentImages
        }
        dispatch(commentPost(comment));
        if (newComment.trim()) {
            setNewComment('');
        }
        if (setSelectedReplyImages2 !== []) {
            setSelectedReplyImages2([]);
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

    const handleMenuClick2 = (e, commentId) => {
        if (e.key === 'edit') {
            console.log("Edit comment")
        } else if (e.key === 'delete') {
            dispatch(deleteCommentPost(commentId))
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="1">Sửa bài viết</Menu.Item>
            <Menu.Item key="2">Xóa bài viết</Menu.Item>
        </Menu>
    );

    const menu2 = (commentId) => (
        <Menu onClick={(e) => handleMenuClick2(e, commentId)}>
            <Menu.Item key="edit">Sửa bình luận</Menu.Item>
            <Menu.Item key="delete">Xóa bình luận</Menu.Item>
        </Menu>
    );
    const getImageClassName = () => {
        const imageCount = post.postImages?.length || 0;
        if (imageCount === 1) return 'single-image';
        if (imageCount === 2) return 'double-image';
        if (imageCount === 3) return 'triple-image';
        if (imageCount >= 4) return 'quadriple-image';
        return '';
    };
    const countTotalComments = (comments) => {
        let total = 0;

        const countReplies = (replies) => {
            replies.forEach(reply => {
                total++;
                if (reply.replies && reply.replies.length > 0) {
                    countReplies(reply.replies);
                }
            });
        };

        comments.forEach(comment => {
            total++;
            if (comment.commentChildren && comment.commentChildren.length > 0) {
                countReplies(comment.commentChildren);
            }
        });

        return total;
    };
    const totalComments = post.comments ? countTotalComments(post.comments) : 0;
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

    const handleReplySubmit = async (commentId) => {
        const imageComments = selectedReplyImages ? await Promise.all(selectedReplyImages.map(async (file) => {
            return await compressAndEncodeImageFile(file);
        })) : [];
        const commentImages = imageComments.map(image => ({image}));
        const comment = {
            content: replyContent,
            userId: myId,
            parentCommentId: commentId,
            postId: post.id,
            commentImages: commentImages
        }
        dispatch(commentPost(comment));
        setIsOpen(true)
        setSelectedReplyImages([])
        setReplyContent('');
        setReplyingTo(null);
    };

    const handleRemoveImage = (index) => {
        setSelectedReplyImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const handleRemoveImage2 = (index) => {
        setSelectedReplyImages2(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const showPostModal = () => setIsModalVisible(true);
    const showLikesModal = () => setIsLikesModalVisible(true);
    const showEditModal = () => setIsEditModalVisible(true);

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


    const generateProfileLink = (email) => email === currentUserEmail
        ? `/profile`
        : `/friendsprofile?email=${email}`;


    return (
        <div>
            <Card className={`search-post-card ${getImageClassName()}`}>
                <div className="search-post-header">
                    <Link to={generateProfileLink(post.email)} style={{textDecoration: 'none'}}>
                        <Avatar src={avatarImage}/>
                    </Link>
                    <div>
                        <Link to={generateProfileLink(post.email)} style={{textDecoration: 'none'}}>
                            <Title level={4} style={{marginLeft: 10}}>
                                {post.firstName} {post.lastName}
                            </Title>
                        </Link>
                        <Text className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
                    </div>
                    {email === post.email && (
                        <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                            <Button
                                className="more-options-button"
                                onClick={(e) => e.preventDefault()}
                            >
                                <MoreOutlined/>
                            </Button>
                        </Dropdown>
                    )}
                </div>

                <Text>{post.content}</Text>

                <div className="search-post-images">
                    {decodeImages.slice(0, 4).map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Post Image ${index + 1}`}
                            className="search-post-image"
                            onClick={showPostModal}
                        />
                    ))}
                </div>
                <div className="search-post-detail-interaction-container">
                    <div className="search-post-detail-like-count-container" onClick={() => showLikesModal(post.likes)}>
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
                    <div className="search-post-detail-comment-count-container"
                         onClick={showPostModal}>
                        {post.comments && post.comments.length > 0 ? (
                            <>
                                <CommentOutlined style={{marginRight: 8, marginLeft: 16}}/> {totalComments} bình
                                luận
                            </>
                        ) : (
                            <>
                                <CommentOutlined style={{marginRight: 8, marginLeft: 16}}/> 0 bình luận
                            </>
                        )}
                    </div>
                </div>
                <div className="search-post-actions">
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
                <Card className="search-post-card">
                    <div className="search-post-header">
                        <Avatar src={avatarImage}/>
                        <Title level={4} style={{marginLeft: 10}}>
                            {post.firstName} {post.lastName}
                        </Title>
                        <Text className="post-date">
                            {new Date(post.createdAt).toLocaleDateString()}
                        </Text>
                    </div>

                    <Text>{post.content}</Text>

                    <div className="search-post-images">
                        {decodeImages.length > 0 ? (
                            decodeImages.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Post Image ${index + 1}`}
                                    className="search-post-image"
                                    onClick={showPostModal}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>

                    <div className="search-post-detail-like-count-container" onClick={showLikesModal}>
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

                    <div className="search-post-comments">
                        <Title level={4}>Bình luận:</Title>
                        {post.comments && post.comments.length > 0 ? (
                            <List
                                dataSource={post.comments}
                                renderItem={item => (
                                    <List.Item key={item.id} style={{display: 'block', marginBottom: '15px'}}>
                                        <List.Item.Meta
                                            avatar={<Avatar
                                                src={avatarImage}/>}
                                            title={<>
                                                {`${item.firstName} ${item.lastName}`}
                                                {myId === item.userId && ( // Kiểm tra xem người dùng có phải là tác giả bình luận không
                                                    <Dropdown overlay={menu2(item.id)} trigger={['click']}
                                                              style={{marginLeft: 10}}>
                                                        <Button type="link">...</Button>
                                                    </Dropdown>
                                                )}
                                            </>}
                                            description={<>
                                                {item.content}
                                                {item.commentImages && item.commentImages.length > 0 && (
                                                    <div style={{marginTop: 10}}>
                                                        {item.commentImages.map((imgSrc, index) => (
                                                            <img
                                                                key={index}
                                                                src={decodeAndDecompressImageFile(decodeURIComponent(imgSrc.image))}
                                                                alt={`Description Image ${index}`}
                                                                style={{
                                                                    width: '100%',
                                                                    marginBottom: 10
                                                                }} // Thay đổi kích thước và khoảng cách tùy chỉnh nếu cần
                                                            />
                                                        ))}
                                                    </div>
                                                )}
                                            </>}
                                        />
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                            <Button type="link" onClick={() => handleReply(item.id)}
                                                    style={{fontSize: '12px'}}>
                                                Trả lời
                                            </Button>
                                            {item.commentChildren && item.commentChildren.length > 0 && (
                                                <Button type="link" onClick={toggleChildren} style={{fontSize: '12px'}}>
                                                    {isOpen ? 'Ẩn phản hồi' : 'Hiển thị phản hồi'}
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
                                                                src={decodeAndDecompressImageFile(decodeURIComponent(item.avatar))}/>}
                                                            title={<>
                                                                {`${item.firstName} ${item.lastName}`}
                                                                {myId === item.userId && ( // Kiểm tra xem người dùng có phải là tác giả bình luận không
                                                                    <Dropdown overlay={menu2(child.id)}
                                                                              trigger={['click']}
                                                                              style={{marginLeft: 10}}>
                                                                        <Button type="link">...</Button>
                                                                    </Dropdown>
                                                                )}
                                                            </>}
                                                            description={<>
                                                                {child.content}
                                                                {child.commentImages && child.commentImages.length > 0 && (
                                                                    <div style={{marginTop: 10}}>
                                                                        {child.commentImages.map((imgSrc, index) => (
                                                                            <img
                                                                                key={index}
                                                                                src={decodeAndDecompressImageFile(decodeURIComponent(imgSrc.image))}
                                                                                alt={`Description Image ${index}`}
                                                                                style={{
                                                                                    width: '100%',
                                                                                    marginBottom: 10
                                                                                }} // Thay đổi kích thước và khoảng cách tùy chỉnh nếu cần
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </>}
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
                post={post}
                onEdit={handleEditPost}
                avatarImage={avatarImage}
            />
        </div>
    );
};

export default SearchPost;
