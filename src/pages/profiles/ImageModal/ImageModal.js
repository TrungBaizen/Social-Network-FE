import React from 'react';
import { Modal, Button, Dropdown, Menu } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import './ImageModal.css';
import {compressAndEncodeImageFile} from "../../../EncodeDecodeImage/compressAndEncodeImageFile"; // Import file CSS

const ImageModal = ({ visible, onClose, imageUrl, type, onUpdate }) => {
    const getTitle = () => {
        switch (type) {
            case 'avatar':
                return 'Avatar';
            case 'cover':
                return 'Cover Image';
            default:
                return 'Image';
        }
    };

    const handleUpload =async (event) => {
        const file = event.target.files[0];
        if (file) {
            // Xử lý tệp ảnh sau khi người dùng chọn
            const base64Compressed = await compressAndEncodeImageFile(file);
            // Gọi callback onUpdate với tệp mới nếu cần thiết
            if (onUpdate) onUpdate(base64Compressed);
        }
    };

    const menu = (
        <Menu>
            <Menu.Item key="upload" icon={<UploadOutlined />}>
                <label htmlFor="upload-input" style={{ cursor: 'pointer', margin: 0 }}>
                    Tải ảnh lên
                </label>
                <input
                    id="upload-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleUpload}
                />
            </Menu.Item>
        </Menu>
    );

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={[
                <Dropdown overlay={menu} key="dropdown">
                    <Button type="primary">
                        {type === 'avatar' ? 'Chỉnh sửa Avatar' : 'Chỉnh sửa Ảnh Bìa'}
                    </Button>
                </Dropdown>,
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            title={getTitle()}
            className="image-modal" // Thêm lớp CSS
        >
            <img src={imageUrl} alt={getTitle()} />
        </Modal>
    );
};

export default ImageModal;
