import React, { useState } from 'react';
import {Modal, Button, Input, Form, DatePicker} from 'antd';
import TextArea from "antd/es/input/TextArea";

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
                    name="firstName"
                    label="Họ"
                    rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                >
                    <Input placeholder="Họ" />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Tên"
                    rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                >
                    <Input placeholder="Tên" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Giới Thiệu"
                    rules={[{ required: true, message: 'Vui lòng nhập giới thiệu' }]}
                >
                    <TextArea
                        placeholder="Giới thiệu"
                        maxLength={255}
                        showCount
                    />
                </Form.Item>
                <Form.Item
                    name="birthDate"
                    label="Ngày Sinh"
                    rules={[{ required: true, message: 'Vui lòng chọn ngày sinh' }]}
                >
                    <DatePicker
                        format="DD-MM-YYYY"
                        placeholder="Chọn ngày sinh"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
                <Form.Item
                    name="hometown"
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
