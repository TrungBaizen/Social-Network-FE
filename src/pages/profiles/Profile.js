import React, {useEffect, useState} from 'react';
import {Layout, Typography, Avatar, Button} from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import './Profile.css';
<<<<<<< HEAD
import {EditOutlined, HomeOutlined} from "@mui/icons-material";
=======
import {EditOutlined, HomeOutlined, PeopleOutline} from "@mui/icons-material";
>>>>>>> master
import EditPersonalInfoModal from "./EditPersonalInfoModal";
import FriendsList from "./FriendsList";
import ImageModal from "./ImageModal/ImageModal";
import {useDispatch, useSelector} from "react-redux";
import {getProfile, updateAvatar, updateCover} from "../../redux/services/profileService";
import {CalendarOutlined, EnvironmentOutlined, ManOutlined, ToolOutlined, WomanOutlined} from "@ant-design/icons";
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
<<<<<<< HEAD
=======
import MyFriendsPage from "./MyFriendsPage/MyFriendsPage";
import ContentArea from "../Layout/ContentArea";
import MyFriendsList from "./MyFriendsPage/MyFriendsList";

>>>>>>> master
const {Content} = Layout;
const {Title, Text} = Typography;

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageModalVisible, setImageModalVisible] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [imageType, setImageType] = useState('');
    const dispatch = useDispatch();
    const email = JSON.parse(localStorage.getItem("currentUser")).email;
    const profile = useSelector(({profiles}) => profiles.profile);
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
        setImageType(type);
        setImageModalVisible(true);
    };

    const handleImageModalClose = () => {
        setImageModalVisible(false);
    };

    // logic update ảnh
    const handleImageUpdate = async (value) => {
        const id = JSON.parse(localStorage.getItem("currentUser")).id;
        try {
            if (imageType === "avatar") {
                await dispatch(updateAvatar({image: value, id}));
            } else {
                await dispatch(updateCover({image: value, id}));
            }
            // Gọi lại API để lấy thông tin profile mới sau khi cập nhật ảnh
            await dispatch(getProfile(email));
            setImageModalVisible(false);
        } catch (error) {
            console.error('Error updating image:', error);
        }
    };

    useEffect(() => {
        dispatch(getProfile(email));
    }, [dispatch, email]);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (profile.imageCover) {
                    const decodeURL = decodeURIComponent(profile.imageCover);
                    const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                    setImageCover(imageUrl);
                } else {
                    setImageCover("https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
                }
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


    return (
        <Layout style={{minHeight: '100vh'}}>
            <ResponsiveAppBar/>
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
                                <div className="row">
                                    <div className="profile-description">
                                        <div>Bài Viết</div>
                                        <div>Bạn Bè</div>
                                        <div>Reels</div>
                                        <div>Ảnh</div>
                                        <div>Video</div>
                                    </div>
                                </div>
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
                                                <CalendarOutlined className="info-icon"/>
                                                <Text>{new Date(profile.birthDate).toLocaleDateString('vi-VN')}</Text>
                                            </>
                                        )}
                                    </div>
                                    <div className="info-item">
                                        {profile.hometown && (
                                            <>
                                                <HomeOutlined className="info-icon"/>
                                                <Text>{profile.hometown}</Text>
                                            </>
                                        )}
                                    </div>
                                    <div className="info-item">
                                        {profile.currentLocation && (
                                            <>
                                                <EnvironmentOutlined className="info-icon"/>
                                                <Text>{profile.currentLocation}</Text>
                                            </>
                                        )}
                                    </div>
                                    <div className="info-item">
                                        {profile.gender === "MALE" ? (
                                            <>
                                                <ManOutlined className="info-icon"/>
                                                <Text>Nam</Text>
                                            </>
                                        ) : (
                                            <>
                                                <WomanOutlined className="info-icon"/>
<<<<<<< HEAD
                                                <Text>Nam</Text>
=======
                                                <Text>Nữ</Text>
>>>>>>> master
                                            </>
                                        )}
                                    </div>
                                    {profile.occupation && (
                                        <div className="info-item">
                                            <ToolOutlined className="info-icon"/>
                                            <Text>{profile.occupation}</Text>
                                        </div>
                                    )}
                                    <Button type="primary" icon={<EditOutlined/>} onClick={showModal}>
                                        Chỉnh Sửa Thông Tin Cá Nhân
                                    </Button>

                                    <EditPersonalInfoModal
                                        visible={isModalVisible}
                                        onClose={handleClose}
                                        onSave={handleSave}
                                    />
                                </div>
                                <FriendsList/>
                            </div>
                            <div className="right-column">
<<<<<<< HEAD
                                <PostPage/>
=======
                               {/*<ContentHome/>*/}
                                <ContentArea/>
>>>>>>> master
                            </div>
                        </div>
                    </div>
                    <ImageModal
                        visible={imageModalVisible}
                        onClose={handleImageModalClose}
                        imageUrl={currentImage}
                        type={imageType}
                        onUpdate={handleImageUpdate}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;