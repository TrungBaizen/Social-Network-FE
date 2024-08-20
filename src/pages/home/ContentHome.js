import React, {useEffect, useState} from 'react';
import { Layout, Avatar, Button } from 'antd';
import './ContentHome.css';
import HomePosts from "../posts/HomePosts/HomePosts";
import CreatePostModal from "../posts/CreatePostModal";
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {useSelector} from "react-redux";

const { Content } = Layout;

const ContentHome = ({ colorBgContainer, borderRadiusLG }) => {
    const [avatarImage, setAvatarImage] = useState('');
    const profile = useSelector(({ profiles }) => profiles.profile);
    const [isModalVisible, setIsModalVisible] = useState(false);


    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (profile.imageAvatar) {
                    const decodeURL = decodeURIComponent(profile.imageAvatar);
                    const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                    setAvatarImage(imageUrl);
                } else {
                    setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
                }
            } catch (error) {
                console.error('Error decoding image:', error);
            }
        };
        if (profile) {
            fetchImage();
        }
    }, [profile]);
    const showCreatePostModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <Content
            className="content-area"
            style={{
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
            }}
        >
            <div className="create-post-container">
                <Avatar
                    src={avatarImage}
                    size={40}
                />
                <Button
                    type="primary"
                    className="create-post-button"
                    onClick={showCreatePostModal}
                >
                    Tạo bài viết
                </Button>
            </div>
            <CreatePostModal
                visible={isModalVisible}
                onCancel={handleCancel}
            />
            <HomePosts />
        </Content>
    );
};

export default ContentHome;
