import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Form, Input, Modal, Select, Typography } from 'antd';
import './EditPostHomeModal.css';
import { useSelector } from "react-redux";
import { decodeAndDecompressImageFile } from "../../../../EncodeDecodeImage/decodeAndDecompressImageFile";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

// AvatarSection Component
const AvatarSection = ({ avatar, name = "Tên Người dùng" }) => (
    <div className="avatar-section">
        <Avatar src={avatar} />
        <Title level={4} style={{ marginLeft: 10 }}>
            {name}
        </Title>
    </div>
);

// StatusInput Component
const StatusInput = () => (
    <Form.Item
        label="Trạng thái"
        name="content"
        rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}
    >
        <TextArea rows={4} placeholder="Nhập trạng thái bài viết" className="status-textarea" />
    </Form.Item>
);

// EditPostHomeModal Component
const EditPostHomeModal = ({ visible, onCancel, post, onEdit, avatarImage }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);
    const profile = useSelector(({ profiles }) => profiles.profile);

    const handleFinish = (values) => {
        const updatedPost = {
            ...post,
            ...values,
            image: fileList.length > 0 ? fileList[0].url : previewImage
        };
        onEdit(updatedPost);
    };

    const handleUploadChange = (event) => {
        const files = Array.from(event.target.files);
        const previewNewList = files.map(file => URL.createObjectURL(file));
        setPreviewImage(previewNewList);
    };

    useEffect(() => {
        form.setFieldsValue({
            content: post.content,
            visibility: post.postStatus
        });
    }, [post, form]);

    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const postList = post.postImages;
                const decodeImageList = postList && postList.length > 0
                    ? await Promise.all(postList.map(async (postImage) => {
                        return await decodeAndDecompressImageFile(decodeURIComponent(postImage.image));
                    }))
                    : [];
                setPreviewImage(decodeImageList);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };
        fetchDecodedImages();
    }, [post.postImages]);

    return (
        <Modal
            title="Chỉnh sửa bài viết"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            <Card className="edit-post-card">
                <AvatarSection
                    avatar={avatarImage}
                    name={`${profile.firstName} ${profile.lastName}`}
                />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                >
                    <Form.Item
                        name="visibility"
                        label="Trạng thái"
                        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                    >
                        <Select>
                            <Option value="PUBLIC">Công khai</Option>
                            <Option value="PRIVATE">Chỉ mình tôi</Option>
                        </Select>
                    </Form.Item>
                    <StatusInput />
                    <div className="image-container">
                        <input
                            type="file"
                            multiple
                            onChange={handleUploadChange}
                        />
                        <div className="image-preview-container">
                            {previewImage.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`preview-${index}`}
                                    className="image-preview-item"
                                />
                            ))}
                        </div>
                    </div>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    );
};

export default EditPostHomeModal;
