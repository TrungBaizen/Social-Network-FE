import React, {useState} from 'react';
import {Layout, Typography, Avatar, Button} from 'antd';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import PostPage from "../posts/PostPage";
import './Profile.css';
import {EditOutlined, FavoriteBorder, HomeOutlined, PeopleOutline} from "@mui/icons-material";
import EditPersonalInfoModal from "./EditPersonalInfoModal"; // Import file CSS chính

const {Content} = Layout;
const {Title, Text} = Typography;

const Profile = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    // Show the modal when the button is clicked
    const showModal = () => {
        setIsModalVisible(true);
    };

    // Handle the save action from the modal
    const handleSave = (values) => {
        console.log('Saved values:', values);
        // Update your state or make an API call to save the changes
    };

    // Close the modal
    const handleClose = () => {
        setIsModalVisible(false);
    };
    return (
        <Layout style={{minHeight: '100vh'}}>
            <ResponsiveAppBar/> {/* Thanh điều hướng trên cùng */}
            <Layout>
                <Content>
                    <div className="profile-container">
                        <div className="banner">
                            <img
                                src="https://images.pexels.com/photos/13440765/pexels-photo-13440765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="Banner"
                                className="banner-img"
                            />
                        </div>
                        <div className="profile-header">
                            <Avatar size={64}
                                    src="https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"/>
                            <div className="profile-info">
                                <Title level={2}>John Doe</Title>
                                <Text>Kỹ sư phần mềm tại XYZ</Text>
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
                            <div className="left-column">
                                <Title level={4}>Giới thiệu</Title>
                                <Text>
                                    Đây là phần giới thiệu thông tin người dùng. Bạn có thể thêm các thông tin chi
                                    tiết
                                    về bản thân, sở thích, kinh nghiệm làm việc, và nhiều hơn nữa.
                                </Text>
                                {/* Thêm các thông tin như địa chỉ, số bạn bè, tình trạng hôn nhân */}
                                <div className="personal-info">
                                    <div className="info-item">
                                        <HomeOutlined className="info-icon"/>
                                        <Text>Địa chỉ: Thanh Son, Vinh Phu, Vietnam</Text>
                                    </div>
                                    <div className="info-item">
                                        <PeopleOutline className="info-icon"/>
                                        <Text>Số bạn bè: 9.186</Text>
                                    </div>
                                    <div className="info-item">
                                        <FavoriteBorder className="info-icon"/>
                                        <Text>Tình trạng hôn nhân: Độc thân</Text>
                                    </div>
                                    <Button type="primary"
                                            icon={<EditOutlined/>} onClick={showModal}>Chỉnh Sửa Thông Tin Cá
                                        Nhân</Button>

                                    {/*Render the EditPersonalInfoModal */}
                                    <EditPersonalInfoModal
                                        visible={isModalVisible}
                                        onClose={handleClose}
                                        onSave={handleSave}
                                    />
                                </div>
                            </div>
                            <div className="left-column">
                                <Title level={4}>Bạn Bè</Title>
                                <Title level={4}>Xem Tất Cả Bạn Bè</Title>
                                {/* Thêm các thông tin như địa chỉ, số bạn bè, tình trạng hôn nhân */}
                                <div className="personal-info">
                                    <div className="info-item">
                                        <HomeOutlined className="info-icon"/>
                                        <Text>Địa chỉ: Thanh Son, Vinh Phu, Vietnam</Text>
                                    </div>
                                    <div className="info-item">
                                        <PeopleOutline className="info-icon"/>
                                        <Text>Số bạn bè: 9.186</Text>
                                    </div>
                                    <div className="info-item">
                                        <FavoriteBorder className="info-icon"/>
                                        <Text>Tình trạng hôn nhân: Độc thân</Text>
                                    </div>
                                    <Button type="primary"
                                            icon={<EditOutlined/>} onClick={showModal}>Chỉnh Sửa Thông Tin Cá
                                        Nhân</Button>

                                    {/*Render the EditPersonalInfoModal */}
                                    <EditPersonalInfoModal
                                        visible={isModalVisible}
                                        onClose={handleClose}
                                        onSave={handleSave}
                                    />
                                </div>
                            </div>
                            <div className="right-column">
                                <PostPage/>
                            </div>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default Profile;
