import React, {useState} from 'react';
import {Button, Input, Modal} from 'antd';
import './PostCreate.css';

const PostCreate = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="post-create-container">
            <div className="post-create-header">
                <a href="https://www.facebook.com/tnd18091995" aria-label="Dòng thời gian của Tran Ngoc Duy" className="profile-link">
                    <div className="profile-pic-container">
                        <img
                            src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/429973265_3120961174703167_3477680488109187875_n.jpg?stp=cp6_dst-jpg_p120x120&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeF8CENiz_FCiIt_VWUzO5Cn9HpSCSthZiz0elIJK2FmLIyntBL90scrPNG8x_VhvXRSMTGf-DHYubgpmTJni4y5&_nc_ohc=dhiUVYZgqzgQ7kNvgFAK1vx&_nc_ht=scontent.fhan17-1.fna&oh=00_AYBQ7v9PaTlwApCzwcorWhW4mwqF_f7o5rlIJKB0yjn2Xw&oe=66BF4FF3"
                            alt="Profile"
                        />
                    </div>
                </a>
                <div className="post-input-container">
                    <Button type="text" onClick={showModal}>
                        Duy ơi, bạn đang nghĩ gì thế?
                    </Button>
                </div>
            </div>

            <Modal
                title="Tạo bài viết"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <Input.TextArea placeholder="Bạn đang nghĩ gì?" rows={4} />
            </Modal>
        </div>
    );
};

export default PostCreate;
