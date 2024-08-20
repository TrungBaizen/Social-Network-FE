import React, {useEffect, useState} from 'react';
import {Modal, List, Avatar} from 'antd';
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {Link} from "react-router-dom";

const LikesModal = ({visible, onCancel, likes , avatar}) => {
    const [avatarImage, setAvatarImage] = useState('');
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (avatar) {
                    const decodeURL = decodeURIComponent(avatar);
                    const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                    setAvatarImage(imageUrl);
                } else {
                    setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
                }
            } catch (error) {
                console.error('Error decoding image:', error);
            }
        };
        if (avatar) {
            fetchImage();
        }
    }, [avatar]);
    const generateProfileLink = (email) => {
        return email === currentUserEmail ? `/profile` : `/friendsprofile?email=${email}`;
    };
    return (
        <Modal
            title="Danh sách người thích"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={400}
        >
            {likes.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={likes}
                    renderItem={(like) => (
                        <Link to={generateProfileLink(like.email)} style={{ textDecoration: 'none' }} className="friend-link">
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={avatarImage}/>} // Sử dụng URL avatar thực tế nếu có
                                title={like.firstName + " " + like.lastName} // Hiển thị tên người dùng
                            />
                        </List.Item>
                        </Link>
                    )}
                />
            ) : (
                <div>Không có ai thích bài viết này</div> // Hiển thị thông báo khi danh sách rỗng
            )}
        </Modal>
    );
};

export default LikesModal;
