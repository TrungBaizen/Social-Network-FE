import React, {useEffect, useState} from 'react';
import { Layout, Typography, Avatar, Button } from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import './Profile.css';
import {EditOutlined, FavoriteBorder, HomeOutlined, PeopleOutline} from "@mui/icons-material";
import FriendsList from "./FriendsList";
import PostsFriend from "../posts/PostsFriend";
import {useDispatch, useSelector} from "react-redux";
import {getProfile} from "../../redux/services/profileService";
import {useLocation, useNavigate} from "react-router-dom";
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {CalendarOutlined, EnvironmentOutlined, ManOutlined, ToolOutlined, WomanOutlined} from "@ant-design/icons";

const { Content } = Layout;
const { Title, Text } = Typography;

const Profile = () => {
    // Trạng thái cho các nút
    const [isFriend, setIsFriend] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search)
    const email = query.get("email");
    const dispatch = useDispatch();
    const profile = useSelector(({ profiles }) => profiles.profile);
    const [imageCover, setImageCover] = useState('');
    const [avatarImage, setAvatarImage] = useState('');

    const toggleFriend = () => {
        setIsFriend(!isFriend);
    };

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
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
        <Layout style={{ minHeight: '100vh' }}>
            <ResponsiveAppBar /> {/* Thanh điều hướng trên cùng */}
            <Layout>
                <Content>
                    <div className="profile-container">
                        <div className="banner">
                            <img
                                src={imageCover}
                                alt="Banner"
                                className="banner-img"
                            />
                        </div>
                        <div className="profile-header d-flex justify-content-between">
                            <div className="d-flex justify-content-start">
                                <Avatar size={64}
                                        src={avatarImage}/>
                                <div className="profile-info">
                                    <Title level={2}>{profile.firstName} {profile.lastName}</Title>
                                </div>
                            </div>
                            <div className="profile-actions d-flex align-items-center">
                                <div className="friend-action me-2">
                                    <Button
                                        type={isFriend ? "default" : "primary"}
                                        onClick={toggleFriend}
                                    >
                                        {isFriend ? "Hủy" : "Thêm Bạn Bè"}
                                    </Button>
                                </div>
                                <div className="follow-action">
                                    <Button
                                        type={isFollowing ? "default" : "primary"}
                                        onClick={toggleFollow}
                                    >
                                        {isFollowing ? "Đã Theo Dõi" : "Theo Dõi"}
                                    </Button>
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
                                                <Text>Nữ</Text>
                                            </>
                                        )}
                                    </div>
                                    {profile.occupation && (
                                        <div className="info-item">
                                            <ToolOutlined className="info-icon"/>
                                            <Text>{profile.occupation}</Text>
                                        </div>
                                    )}
                                </div>
                                <FriendsList/>
                            </div>
                            <div className="right-column">
                                <PostsFriend/>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;
