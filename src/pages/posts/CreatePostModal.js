// CreatePostModal.js
import React, { useState } from 'react';
import { Modal, Button, Typography, Input } from 'antd';
import { VideoCameraOutlined, PictureOutlined, SmileOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

const CreatePostModal = ({ visible, onCancel }) => {
    const [postContent, setPostContent] = useState('');

    const handleContentChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleSubmit = () => {
        // Handle post submission logic here
        console.log('Post submitted:', postContent);
        setPostContent('');
        onCancel(); // Close the modal after submitting
    };

    return (
        <Modal
            title="Tạo bài viết"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <Title level={4}>Duy ơi, bạn đang nghĩ gì thế?</Title>
            <TextArea
                rows={4}
                value={postContent}
                onChange={handleContentChange}
                placeholder="Viết nội dung bài viết..."
            />
            <div style={{ marginTop: 20 }}>
                <Button icon={<VideoCameraOutlined />} style={{ marginRight: 10 }}>
                    Video trực tiếp
                </Button>
                <Button icon={<PictureOutlined />} style={{ marginRight: 10 }}>
                    Ảnh/video
                </Button>
                <Button icon={<SmileOutlined />}>
                    Cảm xúc/hoạt động
                </Button>
            </div>
            <Button
                type="primary"
                style={{ marginTop: 20 }}
                onClick={handleSubmit}
            >
                Đăng
            </Button>
        </Modal>
    );
};

export default CreatePostModal;
