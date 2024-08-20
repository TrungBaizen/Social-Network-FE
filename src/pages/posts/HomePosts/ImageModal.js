// // ImageModal.js
// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { Modal, Avatar, Typography, Button } from 'antd';
// import { decodeAndDecompressImageFile } from '../../../EncodeDecodeImage/decodeAndDecompressImageFile';
// import LikesModal from "../../likes/LikesModal";
// import './ImageModal.css';
//
// const { Title, Text } = Typography;
//
// const ImageModal = ({ visible, onClose, image, author, date, comments = [], likes = [] }) => {
//     const [likesVisible, setLikesVisible] = useState(false);
//
//     const handleLikesClick = () => {
//         setLikesVisible(true);
//     };
//
//     return (
//         <>
//             <Modal
//                 visible={visible}
//                 onCancel={onClose}
//                 footer={null}
//                 width={800}
//                 title="Chi tiết bài đăng"
//                 className="image-modal"
//             >
//                 <h1>Alo</h1>
//                 <div className="image-modal-content">
//                     <Text className="image-modal-content-text">Hi</Text>
//                     <img
//                         src={decodeAndDecompressImageFile(decodeURIComponent(image))}
//                         alt="Detail"
//                         className="image-modal-image"
//                     />
//                     <Button
//                         type="link"
//                         onClick={handleLikesClick}
//                         className="image-modal-likes-button"
//                     >
//                         {likes?.length || 0} lượt thích
//                     </Button>
//                     <div className="image-modal-comments">
//                         <Title level={5}>Bình luận:</Title>
//                         {comments?.length === 0 ? (
//                             <Text>Chưa có bình luận</Text>
//                         ) : (
//                             comments?.map((comment, index) => (
//                                 <div key={index} className="image-modal-comment-item">
//                                     <Text>{comment}</Text>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                     <textarea rows="4" placeholder="Viết bình luận..." className="image-modal-comment-input" />
//                     <Button type="primary" className="image-modal-submit-button">Gửi</Button>
//                 </div>
//             </Modal>
//
//             <LikesModal
//                 visible={likesVisible}
//                 onClose={() => setLikesVisible(false)}
//                 likes={likes}
//             />
//         </>
//     );
// };
//
// ImageModal.propTypes = {
//     visible: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     image: PropTypes.string.isRequired,
//     author: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         avatar: PropTypes.string.isRequired
//     }).isRequired,
//     date: PropTypes.string.isRequired,
//     comments: PropTypes.arrayOf(PropTypes.string),
//     likes: PropTypes.arrayOf(PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         avatar: PropTypes.string.isRequired
//     }))
// };
//
// ImageModal.defaultProps = {
//     comments: [],
//     likes: []
// };
//
// export default ImageModal;
//
