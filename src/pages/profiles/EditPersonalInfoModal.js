import React, { useState, useEffect } from 'react';
import { Modal, Input, Form, Radio } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { updateProfile } from "../../redux/services/profileService";

const EditPersonalInfoModal = ({ visible, onClose, onSave }) => {
    const dispatch = useDispatch();
    const profile = useSelector(({ profiles }) => profiles.profile);
    const [form] = Form.useForm();
    const [birthDate, setBirthDate] = useState({
        day: '',
        month: '',
        year: '',
    });

    useEffect(() => {
        if (profile.birthDate) {
            const date = moment(profile.birthDate);
            setBirthDate({
                day: date.date(),
                month: date.month() + 1,
                year: date.year(),
            });
        }
    }, [profile.birthDate]);

    const handleSave = () => {
        const result = form.getFieldValue();
        const id = JSON.parse(localStorage.getItem("currentUser")).id;
        const birthDateString = `${birthDate.year}-${String(birthDate.month).padStart(2, '0')}-${String(birthDate.day).padStart(2, '0')}`;

        const profile = {
            id: id,
            user:{
                id:id
            },
            firstName: result.firstName,
            lastName: result.lastName,
            description: result.description,
            birthDate: birthDateString,
            hometown: result.hometown,
            currentLocation: result.currentLocation,
            occupation: result.occupation,
            gender: result.gender
        };
        dispatch(updateProfile({ profile: profile, id }));
    };

    const handleDateChange = (value, field) => {
        setBirthDate({
            ...birthDate,
            [field]: value,
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
            <Form form={form} layout="vertical"
                  initialValues={{
                      firstName: profile.firstName,
                      lastName: profile.lastName,
                      description: profile.description ? profile.description : "",
                      hometown: profile.hometown,
                      currentLocation: profile.currentLocation,
                      occupation: profile.occupation,
                      gender: profile.gender
                  }}>
                <Form.Item
                    name="firstName"
                    label="Họ"
                    rules={[{ required: true, message: 'Họ không được để trống' }]}
                >
                    <Input placeholder="Họ" />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Tên"
                    rules={[{ required: true, message: 'Tên không được để trống' }]}
                >
                    <Input placeholder="Tên" />
                </Form.Item>
                <Form.Item
                    name="description"
                    label="Giới Thiệu"
                >
                    <TextArea
                        placeholder="Giới thiệu"
                        maxLength={255}
                        showCount
                    />
                </Form.Item>
                <Form.Item
                    label="Ngày Sinh"
                >
                    <Input.Group compact>
                        <Form.Item
                            style={{ width: '33%' }}
                            validateStatus={birthDate.day && (birthDate.day < 1 || birthDate.day > 31) ? 'error' : ''}
                        >
                            <Input
                                placeholder="Ngày"
                                value={birthDate.day}
                                onChange={(e) => handleDateChange(e.target.value, 'day')}
                                maxLength={2}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ width: '33%' }}
                            validateStatus={birthDate.month && (birthDate.month < 1 || birthDate.month > 12) ? 'error' : ''}
                        >
                            <Input
                                placeholder="Tháng"
                                value={birthDate.month}
                                onChange={(e) => handleDateChange(e.target.value, 'month')}
                                maxLength={2}
                            />
                        </Form.Item>
                        <Form.Item
                            style={{ width: '34%' }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Năm sinh không được để trống',
                                },
                                {
                                    validator: (_, value) => {
                                        if (!value || (value >= 1900 && value <= 2010)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Năm sinh phải từ 1900 đến 2010'));
                                    },
                                },
                            ]}
                        >
                            <Input
                                placeholder="Năm"
                                value={birthDate.year}
                                onChange={(e) => handleDateChange(e.target.value, 'year')}
                                maxLength={4}
                            />
                        </Form.Item>
                    </Input.Group>
                </Form.Item>
                <Form.Item
                    name="hometown"
                    label="Nơi Đến"
                >
                    <Input placeholder="Nơi đến" />
                </Form.Item>
                <Form.Item
                    name="currentLocation"
                    label="Nơi Ở Hiện Tại"
                >
                    <Input placeholder="Nơi ở hiện tại" />
                </Form.Item>
                <Form.Item
                    name="occupation"
                    label="Nghề Nghiệp"
                >
                    <Input placeholder="Nghề nghiệp" />
                </Form.Item>
                <Form.Item
                    name="gender"
                    label="Giới Tính"
                >
                    <Radio.Group>
                        <Radio value="MALE">Nam</Radio>
                        <Radio value="FEMALE">Nữ</Radio>
                        <Radio value="OTHER">Khác</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditPersonalInfoModal;
