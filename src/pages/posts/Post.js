//
// import React, { useState } from 'react';
// import { Card, Typography, Button, Input, List, Modal, Avatar } from 'antd';
// import { LikeOutlined, LikeFilled, MoreOutlined, CommentOutlined } from '@ant-design/icons';
// import './Post.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import EditPostModal from "./EditPostModal";
//
// const { Title, Text } = Typography;
// const { TextArea } = Input;
//
// const DEFAULT_AVATAR = 'https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1';
// const POST_IMAGE = 'https://cafebiz.cafebizcdn.vn/2018/7/13/photo-1-1531464319857736227485.jpg';
// const DEFAULT_NAME = 'User-Account'
// const Post = ({ post }) => {
//     const [newComment, setNewComment] = useState('');
//     const [comments, setComments] = useState(post.comments ? post.comments.map(c => c.content) : []);
//     const [isModalVisible, setIsModalVisible] = useState(false);
//     const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
//     const [isEditModalVisible, setIsEditModalVisible] = useState(false);
//     const [liked, setLiked] = useState(post.likes && post.likes.length > 0);
//
//     const handleCommentChange = (e) => {
//         setNewComment(e.target.value);
//     };
//
//     const handleCommentSubmit = () => {
//         if (newComment.trim()) {
//             setComments([...comments, newComment]);
//             setNewComment('');
//         }
//     };
//
//     const handleLikeClick = () => {
//         setLiked(!liked);
//     };
//
//     const showPostModal = () => {
//         setIsModalVisible(true);
//     };
//
//     const showLikesModal = () => {
//         setIsLikesModalVisible(true);
//     };
//
//     const showEditModal = () => {
//         setIsEditModalVisible(true);
//     };
//
//     const handleCancel = () => {
//         setIsModalVisible(false);
//         setIsLikesModalVisible(false);
//         setIsEditModalVisible(false);
//     };
//
//     return (
//         <div>
//             <Card className="post-card">
//                 <div className="post-header">
//                     <Avatar src={DEFAULT_AVATAR} />
//                     <Title level={4} style={{ marginLeft: 10 }}>
//                         {DEFAULT_NAME}
//                     </Title>
//                     <Button
//                         className="more-options-button"
//                         onClick={showEditModal}
//                         icon={<MoreOutlined />}
//                     />
//                 </div>
//                 <Text>{post.content}</Text>
//                 {POST_IMAGE && <div className="post-image-container"><img src={POST_IMAGE} alt="Post" className="post-image" /></div>}
//                 <Text type="secondary">Ngày tạo: {new Date(post.createdAt).toLocaleDateString()}</Text>
//                 {post.updatedAt && <Text type="secondary">Cập nhật: {new Date(post.updatedAt).toLocaleDateString()}</Text>}
//                 <Text type="secondary">Trạng thái: {post.postStatus}</Text>
//                 <div onClick={showLikesModal} className="post-stats">
//                     {liked ? (
//                         <>
//                             <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes ? post.likes.length + 1 : 1} lượt thích
//                         </>
//                     ) : (
//                         <>
//                             <LikeOutlined style={{ marginRight: 8 }} /> {post.likes ? post.likes.length : 0} lượt thích
//                         </>
//                     )}
//                 </div>
//                 <div className="post-actions">
//                     <Button
//                         className="post-action-button"
//                         icon={liked ? <LikeFilled /> : <LikeOutlined />}
//                         onClick={handleLikeClick}
//                     >
//                         {liked ? 'Đã thích' : 'Thích'}
//                     </Button>
//                     <Button className="post-action-button" icon={<CommentOutlined />} onClick={showPostModal}>
//                         Bình luận
//                     </Button>
//                 </div>
//             </Card>
//
//             <Modal
//                 title="Chi tiết bài đăng"
//                 visible={isModalVisible}
//                 onCancel={handleCancel}
//                 footer={null}
//                 width={800}
//             >
//                 <Card className="post-card">
//                     <div className="post-header">
//                         <Avatar src={DEFAULT_AVATAR}/>
//                         <Title level={4} style={{ marginLeft: 10 }}>
//                             {DEFAULT_NAME}
//                         </Title>
//                     </div>
//                     <Text>{post.content}</Text>
//                     {POST_IMAGE && <div className="post-image-container"><img src={POST_IMAGE} alt="Post" className="post-image" /></div>}
//                     <Text type="secondary">Ngày tạo: {new Date(post.createdAt).toLocaleDateString()}</Text>
//                     {post.updatedAt && <Text type="secondary">Cập nhật: {new Date(post.updatedAt).toLocaleDateString()}</Text>}
//                     <Text type="secondary">Trạng thái: {post.postStatus}</Text>
//
//                     <div onClick={showLikesModal} className="post-stats">
//                         {liked ? (
//                             <>
//                                 <LikeFilled style={{ marginRight: 8, color: '#1890ff' }} /> {post.likes ? post.likes.length + 1 : 1} lượt thích
//                             </>
//                         ) : (
//                             <>
//                                 <LikeOutlined style={{ marginRight: 8 }} /> {post.likes ? post.likes.length : 0} lượt thích
//                             </>
//                         )}
//                     </div>
//                     <div className="post-comments">
//                         <Title level={4}>Bình luận:</Title>
//                         <List
//                             dataSource={comments}
//                             renderItem={item => (
//                                 <List.Item>{item}</List.Item>
//                             )}
//                         />
//                         <TextArea
//                             rows={4}
//                             value={newComment}
//                             onChange={handleCommentChange}
//                             placeholder="Viết bình luận..."
//                         />
//                         <Button
//                             type="primary"
//                             onClick={handleCommentSubmit}
//                             style={{ marginTop: 10 }}
//                         >
//                             Gửi
//                         </Button>
//                     </div>
//                 </Card>
//             </Modal>
//
//             <Modal
//                 title="Những người đã thích bài đăng"
//                 visible={isLikesModalVisible}
//                 onCancel={handleCancel}
//                 footer={null}
//                 width={400}
//             >
//                 <List
//                     dataSource={post.likes ? post.likes.map(like => like.userId) : []}
//                     renderItem={item => (
//                         <List.Item>
//                             <LikeOutlined style={{ marginRight: 8 }} />
//                             User {item}
//                         </List.Item>
//                     )}
//                 />
//             </Modal>
//
//             <EditPostModal
//                 visible={isEditModalVisible}
//                 onCancel={handleCancel}
//                 post={post}
//                 onEdit={(updatedPost) => {
//                     console.log('Updated Post:', updatedPost);
//                     setIsEditModalVisible(false);
//                 }}
//             />
//         </div>
//     );
// };
//
// export default Post;



import React, { useState } from 'react';
import { Card, Typography, Button, Input, List, Modal, Avatar } from 'antd';
import { LikeOutlined, LikeFilled, MoreOutlined, CommentOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditPostModal from "./EditPostModal";
import './Post.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const DEFAULT_AVATAR = 'https://img.a.transfermarkt.technology/portrait/big/8198-1694609670.jpg?lm=1';
const POST_IMAGE = 'https://cafebiz.cafebizcdn.vn/2018/7/13/photo-1-1531464319857736227485.jpg?lm=1';
const DEFAULT_NAME = 'User-Account';

const Post = ({ post }) => {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(post.comments ? post.comments.map(c => c.content) : []);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isLikesModalVisible, setIsLikesModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [liked, setLiked] = useState(post.likes && post.likes.length > 0);

    // Trạng thái kích thước ảnh
    const [zoomLevel, setZoomLevel] = useState(1); // Kích thước ảnh khởi tạo là 1x

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

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsLikesModalVisible(false);
        setIsEditModalVisible(false);
    };

    // Xử lý phóng to và thu nhỏ ảnh
    const zoomIn = () => {
        setZoomLevel(prevLevel => prevLevel + 0.1); // Tăng kích thước ảnh
    };

    const zoomOut = () => {
        setZoomLevel(prevLevel => Math.max(0.5, prevLevel - 0.1)); // Giảm kích thước ảnh
    };

    return (
        <div>
            <Card className="post-card">
                <div className="post-header">
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
                        className="post-action-button"
                        icon={liked ? <LikeFilled /> : <LikeOutlined />}
                        onClick={handleLikeClick}
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
                bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} // Căn giữa nội dung
            >
                <Card className="post-card">
                    <div className="post-header">
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
                title="Những người đã thích"
                visible={isLikesModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                {/* Thêm nội dung cho modal hiển thị những người đã thích */}
            </Modal>

            <EditPostModal
                visible={isEditModalVisible}
                onCancel={handleCancel}
                post={post}
            />
        </div>
    );
};

export default Post;
