import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Form, Input, Modal, Select, Typography } from 'antd';
import './EditPostDetailModal.css'; // Import the CSS file
import { decodeAndDecompressImageFile } from '../../EncodeDecodeImage/decodeAndDecompressImageFile'; // Import the decode function

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AvatarSection = ({ avatar, name }) => (
    <div className="post-header">
        <Avatar src={avatar} />
        <Title level={4} style={{ marginLeft: 10 }}>
            {name}
        </Title>
    </div>
);

const StatusInput = ({ form }) => (
    <Form.Item
        label="Nội dung"
        name="content"
        rules={[{ required: true, message: 'Vui lòng nhập nội dung bài viết!' }]}
    >
        <TextArea rows={4} placeholder="Nhập nội dung bài viết" className="status-input" />
    </Form.Item>
);

const EditPostDetailModal = ({ visible, onCancel, post, onEdit, avatarImage }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);

    const handleFinish = (values) => {
        const updatedPost = {
            ...post,
            ...values,
            image: fileList.length > 0 ? fileList[0].url : previewImage
        };
        onEdit(updatedPost);
    };

    const handleUploadChange = (event) => {
        const files = Array.from(event.target.files); // Convert FileList to array
        const previewNewList = files.map(file => URL.createObjectURL(file));
        setPreviewImage(previewNewList);
    };

    useEffect(() => {
        form.setFieldsValue({
            content: post.content,
            visibility: post.postStatus // Ensure the value is 'PUBLIC' or 'PRIVATE'
        });
    }, [post, form]);

    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const postList = post.postImages;
                const decodeImageList = postList && postList.length > 0
                    ? await Promise.all(postList.map(async (post) => {
                        return await decodeAndDecompressImageFile(decodeURIComponent(post.image));
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
            <Card className="post-card">
                <AvatarSection
                    avatar={avatarImage}
                    name={`${post.firstName} ${post.lastName}`}
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
                    <StatusInput form={form} />
                    <div>
                        <input
                            type="file"
                            multiple
                            onChange={handleUploadChange}
                        />
                        <div className="image-preview-list">
                            {previewImage.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`preview-${index}`}
                                    className="image-preview"
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

export default EditPostDetailModal;
