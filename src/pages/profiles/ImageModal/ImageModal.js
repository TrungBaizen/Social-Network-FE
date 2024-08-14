import React from 'react';
import { Modal, Button } from 'antd';
import './ImageModal.css';

const ImageModal = ({ visible, onClose, imageUrl, onUpdate }) => {
    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="update" type="primary" onClick={onUpdate}>
                    Cập Nhật Ảnh
                </Button>,
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            className="image-modal"
        >
            <img src={imageUrl} alt="Profile or Banner" />
        </Modal>
    );
};

export default ImageModal;
