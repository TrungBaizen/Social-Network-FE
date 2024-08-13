import React, { useEffect, useState } from 'react';
import { Layout, Typography, Avatar, Button } from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import PostPage from "../posts/PostPage";
import './Profile.css';
import { EditOutlined, HomeOutlined, PeopleOutline } from "@mui/icons-material";
import EditPersonalInfoModal from "./EditPersonalInfoModal";
import FriendsList from "./FriendsList";
import ImageModal from "./ImageModal/ImageModal";
import { useDispatch, useSelector } from "react-redux";
import {getProfile, updateAvatar, updateCover} from "../../redux/services/profileService";
import { useLocation } from "react-router-dom";
import { CalendarOutlined, EnvironmentOutlined, ManOutlined, ToolOutlined, WomanOutlined } from "@ant-design/icons";
import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [imageType, setImageType] = useState(''); // Added state for image type
    const dispatch = useDispatch();
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const email = query.get('email');
    const profile = useSelector(({ profiles }) => profiles.profile);
    const [imageCover, setImageCover] = useState('');
    const [avatarImage, setAvatarImage] = useState('');

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleSave = (values) => {
        console.log('Saved values:', values);
    };

    const handleClose = () => {
        setIsModalVisible(false);
    };

    const handleImageClick = (imageUrl, type) => {
        setCurrentImage(imageUrl);
        setImageType(type); // Set image type here
        setImageModalVisible(true);
    };

    const handleImageModalClose = () => {
        setImageModalVisible(false);
    };

    const handleImageUpdate = () => {
     // logic update ảnh
    };

    useEffect(() => {
        dispatch(getProfile(email));
    }, [dispatch, email]);

    useEffect(() => {
        const fetchImage = async () => {
            if (profile.imageCover) {
                try {
                    const imageUrl = await decodeAndDecompressImageFile(profile.imageCover);
                    setImageCover(imageUrl);
                } catch (error) {
                    console.error('Error decoding image:', error);
                    setImageCover("https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
                }
            } else {
                setImageCover("https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
            }
            if (profile.avatar) {
                try {
                    const decompressedBlob = await decodeAndDecompressImageFile(profile.imageAvatar);
                    const imageUrl = URL.createObjectURL(decompressedBlob);
                    setAvatarImage(imageUrl);
                } catch (error) {
                    console.error('Error decoding avatar image:', error);
                    setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
                }
            } else {
                setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
            }
        };
        fetchImage();
    }, [profile]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <ResponsiveAppBar />
            <Layout>
                <Content>
                    <div className="profile-container">
                        <div className="banner" onClick={() => handleImageClick(imageCover, 'cover')}>
                            <img
                                src={imageCover}
                                alt="Banner"
                                className="banner-img"
                            />
                        </div>
                        <div className="profile-header">
                            <Avatar
                                size={64}
                                src={avatarImage}
                                onClick={() => handleImageClick(avatarImage, 'avatar')}
                            />
                            <div className="profile-info">
                                <Title level={2}>{profile.firstName} {profile.lastName}</Title>
                            </div>
                        </div>
                        <div className="profile-section">
                            <div className="profile-navigation">
                                <div>Bài Viết</div>
                                <div>Giới Thiệu</div>
                                <div>Lượt Nhắc</div>
                                <div>Reels</div>
                                <div>Ảnh</div>
                                <div>Video</div>
                            </div>
                        </div>
                        <div className="profile-content">
                            <div className="left-column-info">
                                <Title level={4}>Giới thiệu</Title>
                                {profile.description && (
                                    <Text>
                                        {profile.description}
                                    </Text>
                                )}
                                <div className="personal-info">
                                    <div className="info-item">
                                        {profile.birthDate && (
                                            <>
                                                <CalendarOutlined className="info-icon" />
                                                <Text>{profile.birthDate}</Text>
                                            </>
                                        )}
                                    </div>
                                    <div className="info-item">
                                        {profile.hometown && (
                                            <>
                                                <HomeOutlined className="info-icon" />
                                                <Text>{profile.hometown}</Text>
                                            </>
                                        )}
                                    </div>
                                    <div className="info-item">
                                        {profile.currentLocation && (
                                            <>
                                                <EnvironmentOutlined className="info-icon" />
                                                <Text>{profile.currentLocation}</Text>
                                            </>
                                        )}
                                    </div>
                                    <div className="info-item">
                                        {profile.gender === "MALE" ? (
                                            <>
                                                <ManOutlined className="info-icon" />
                                                <Text>Nam</Text>
                                            </>
                                        ) : (
                                            <>
                                                <WomanOutlined className="info-icon" />
                                                <Text>Nữ</Text>
                                            </>
                                        )}
                                    </div>
                                    {profile.occupation && (
                                        <div className="info-item">
                                            <ToolOutlined className="info-icon" />
                                            <Text>{profile.occupation}</Text>
                                        </div>
                                    )}
                                    <Button type="primary" icon={<EditOutlined />} onClick={showModal}>
                                        Chỉnh Sửa Thông Tin Cá Nhân
                                    </Button>

                                    <EditPersonalInfoModal
                                        visible={isModalVisible}
                                        onClose={handleClose}
                                        onSave={handleSave}
                                    />
                                </div>
                                <FriendsList />
                            </div>
                            <div className="right-column">
                                <PostPage />
                            </div>
                        </div>
                    </div>
                    <ImageModal
                        visible={imageModalVisible}
                        onClose={handleImageModalClose}
                        imageUrl={currentImage}
                        type={imageType} // Pass image type
                        onUpdate={handleImageUpdate}
                    />

                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;
