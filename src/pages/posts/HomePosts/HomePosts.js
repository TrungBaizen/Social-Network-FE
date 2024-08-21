import React, { useEffect, useState } from 'react';
import { Typography, Modal, Image, Input, List } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import {commentPost, deleteCommentPost, getAllPostByFollowing} from "../../../redux/services/postService";
import './HomePosts.css';
import { decodeAndDecompressImageFile } from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import PostDetail from "./PostDetail";

const { Text } = Typography;
const { TextArea } = Input;

const HomePosts = () => {
    const [likedPosts, setLikedPosts] = useState(new Set());
    const [selectedPost, setSelectedPost] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const profile = useSelector(({ profiles }) => profiles.profile);
    const dispatch = useDispatch();
    const posts = useSelector(({ posts }) => posts.listPostHome);
    const { id, email } = JSON.parse(localStorage.getItem('currentUser'));


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                await dispatch(getAllPostByFollowing(id));
                setLoading(false);
            } catch (error) {
                setError('Không thể tải bài viết');
                setLoading(false);
            }
        };

        fetchPosts();
    }, [dispatch, id]);

    const handleModalCancel = () => {
        setShowImageModal(false);
        setSelectedPost(null);
    };


    const filteredPosts = posts.filter(post =>
        post.email === profile.email || post.postStatus !== 'PRIVATE'
    );

    if (loading) return <Text>Đang tải...</Text>;
    if (error) return <Text>Lỗi: {error}</Text>;

    return (
        <div className="HomePosts-home-posts">
            {filteredPosts && filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                    <PostDetail
                        key={post.id}
                        post={post}
                        likedPosts={likedPosts}
                    />
                ))
            ) : (
                <Text>Không có bài viết nào</Text>
            )}

            <Modal
                visible={showImageModal}
                footer={null}
                onCancel={handleModalCancel}
                width={800}
            >
                {selectedPost && selectedPost.postImages && (
                    <Image
                        src={decodeAndDecompressImageFile(decodeURIComponent(selectedPost.postImages[0].image))}
                        alt="Selected"
                        style={{ width: '100%' }}
                    />
                )}
            </Modal>


        </div>
    );
};

export default HomePosts;
