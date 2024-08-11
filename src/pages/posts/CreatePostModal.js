
import React, { useState } from 'react';
import { Modal, Button, Typography, Input, Select } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import './CreatePostModal.css';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const CreatePostModal = ({ visible, onCancel }) => {
    const [postContent, setPostContent] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const handleContentChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        console.log('Selected file:', e.target.files[0]);
    };

    const handleSubmit = () => {
        console.log('Post submitted:', postContent, selectedFile);
        setPostContent('');
        setSelectedFile(null);
        onCancel();
    };

    const handleSelectChange = (value) => {
        console.log('Selected visibility:', value);
    };

    return (
        <Modal
            title={null}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Title level={4}>Duy ơi, bạn đang nghĩ gì thế?</Title>
                <Select
                    defaultValue="public"
                    style={{ width: 110, marginRight: '20px' }}
                    onChange={handleSelectChange}
                >
                    <Option value="public">Công khai</Option>
                    <Option value="private">Chỉ mình tôi</Option>
                </Select>
            </div>
            <TextArea
                rows={4}
                value={postContent}
                onChange={handleContentChange}
                placeholder="Viết nội dung bài viết..."
                style={{ marginTop: 20 }}
            />
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                <label htmlFor="file-upload" className="custom-file-upload">
                    <PictureOutlined style={{ marginRight: 10 }} />
                    Ảnh/video
                </label>
                <input
                    id="file-upload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
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

