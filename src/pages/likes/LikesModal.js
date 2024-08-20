import React from 'react';
import { Modal, List, Avatar } from 'antd';

const LikesModal = ({ visible, onCancel, likedBy }) => {
    return (
        <Modal
            title="Danh sách người thích"
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={400}
        >
            <List
                itemLayout="horizontal"
                dataSource={likedBy}
                renderItem={(likedBy) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={likedBy.imageAvatar} />} // Sử dụng URL avatar thực tế nếu có
                            title={likedBy.firstName + likedBy.lastName} // Hiển thị tên người dùng
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default LikesModal;
