import React from 'react';
import {Avatar, List, Modal} from 'antd';

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
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={user.avatar} />} // Sử dụng URL avatar thực tế nếu có
                            title={user.name} // Hiển thị tên người dùng
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default LikesModal;
