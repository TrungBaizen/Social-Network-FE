import React, { useState } from 'react';
import { Modal, Button, Input, Form } from 'antd';

const EditPersonalInfoModal = ({ visible, onClose, onSave }) => {
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields()
            .then(values => {
                onSave(values);
                onClose();
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="Chỉnh Sửa Thông Tin Cá Nhân"
            visible={visible}
            onCancel={onClose}
            onOk={handleSave}
            okText="Lưu"
            cancelText="Hủy"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="dateOfBirth"
                    label="Ngày Sinh"
                    rules={[{ required: true, message: 'Vui lòng nhập ngày sinh' }]}
                >
                    <Input placeholder="Ngày sinh" />
                </Form.Item>
                <Form.Item
                    name="placeOfOrigin"
                    label="Nơi Đến"
                    rules={[{ required: true, message: 'Vui lòng nhập nơi đến' }]}
                >
                    <Input placeholder="Nơi đến" />
                </Form.Item>
                <Form.Item
                    name="currentResidence"
                    label="Nơi Ở Hiện Tại"
                    rules={[{ required: true, message: 'Vui lòng nhập nơi ở hiện tại' }]}
                >
                    <Input placeholder="Nơi ở hiện tại" />
                </Form.Item>
                <Form.Item
                    name="occupation"
                    label="Nghề Nghiệp"
                    rules={[{ required: true, message: 'Vui lòng nhập nghề nghiệp' }]}
                >
                    <Input placeholder="Nghề nghiệp" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPersonalInfoModal;
