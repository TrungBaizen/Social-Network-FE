import React from 'react';
import { Modal, List, Avatar } from 'antd';

const LikesModal = ({ visible, onClose, likedBy }) => {
    return (
        <Modal
            title="Danh sách người thích"
            visible={visible}
            onCancel={onClose}
            footer={null}
            width={400}
        >
            <List
                itemLayout="horizontal"
                dataSource={likedBy || []} // Đảm bảo rằng dataSource luôn là mảng
                renderItem={user => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={user.avatar} />}
                            title={user.name}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default LikesModal;
