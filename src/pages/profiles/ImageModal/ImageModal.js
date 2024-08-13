import React from 'react';
import { Modal, Button } from 'antd';
import './ImageModal.css';

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

    return (
        <Modal
            visible={visible}
            onCancel={onClose}
            footer={[
                type && (
                    <Button key="update" type="primary" onClick={onUpdate}>
                        {type === 'avatar' ? 'Cập Nhật Avatar' : 'Cập Nhật Ảnh Bìa'}
                    </Button>
                ),
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            title={getTitle()}
            className="image-modal"
        >
            <img src={imageUrl} alt={getTitle()} style={{ width: '100%' }} />
        </Modal>
    );
};

export default ImageModal;
