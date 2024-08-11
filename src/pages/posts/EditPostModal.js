import React, { useState } from 'react';
import { Modal, Form, Input, Button, Upload, Avatar, Typography, Select, Card } from 'antd';
import { UploadOutlined, LikeOutlined } from '@ant-design/icons';
import './EditPostModal.css'; // Nhập file CSS

const { Title, Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const AvatarSection = ({ avatar, name, visibility, onVisibilityChange }) => (
    <div className="post-header">
        <Avatar src={avatar} />
        <Title level={4} style={{ marginLeft: 10 }}>
            {name}
        </Title>
        <Select
            defaultValue={visibility}
            onChange={onVisibilityChange}
            style={{ marginLeft: 'auto' }}
        >
            <Option value="public">Công khai</Option>
            <Option value="private">Chỉ mình tôi</Option>
        </Select>
    </div>
);

const StatusInput = () => (
    <Form.Item
        label="Trạng thái"
        name="status"
        rules={[{ required: true, message: 'Vui lòng nhập trạng thái!' }]}
    >
        <TextArea rows={4} placeholder="Nhập trạng thái bài viết" className="status-input" />
    </Form.Item>
);

const ImageUpload = ({ previewImage, fileList, onUploadChange }) => (
    <Form.Item label="Hình ảnh" className="image-container">
        <div className="image-preview">
            <img src={previewImage} alt="Preview" />
        </div>
        <Upload
            action="/upload"
            listType="picture"
            fileList={fileList}
            onChange={onUploadChange}
            showUploadList={{ showPreviewIcon: true }}
            beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                    alert('Bạn chỉ có thể tải lên hình ảnh!');
                }
                return isImage;
            }}
        >
            <Button icon={<UploadOutlined />}>Tải lên</Button>
        </Upload>
    </Form.Item>
);

const EditPostModal = ({ visible, onCancel, post, onEdit }) => {
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState(post.image);

    const handleFinish = (values) => {
        const updatedPost = {
            ...post,
            ...values,
            image: fileList.length > 0 ? fileList[0].url : previewImage
        };
        onEdit(updatedPost);
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
        if (fileList.length > 0) {
            setPreviewImage(fileList[0].url);
        }
    };

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
                    avatar={post.user.avatar}
                    name={post.user.name}
                    visibility={post.visibility || 'public'}
                    onVisibilityChange={(value) => form.setFieldsValue({ visibility: value })}
                />
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={{
                        status: post.status,
                        visibility: post.visibility || 'public'
                    }}
                >
                    <StatusInput />
                    <ImageUpload
                        previewImage={previewImage}
                        fileList={fileList}
                        onUploadChange={handleUploadChange}
                    />
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

export default EditPostModal;
