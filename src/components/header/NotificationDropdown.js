// components/NotificationDropdown.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Badge, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { fetchNotifications } from '/src/redux/reducers/notificationReducer';

const NotificationDropdown = () => {
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications.list);
    const status = useSelector((state) => state.notifications.status);
    const error = useSelector((state) => state.notifications.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchNotifications());
        }
    }, [status, dispatch]);

    const menu = (
        <Menu>
            {status === 'loading' && <Menu.Item key="loading">Loading...</Menu.Item>}
            {status === 'failed' && <Menu.Item key="error">{`Error: ${error}`}</Menu.Item>}
            {status === 'succeeded' &&
            notifications.length > 0 ? (
                notifications.map(notification => (
                    <Menu.Item key={notification.id}>
                        {notification.message}
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key="empty">No Notifications</Menu.Item>
            )}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Badge count={notifications.length} offset={[10, 0]}>
                <BellOutlined style={{ fontSize: '24px' }} />
            </Badge>
        </Dropdown>
    );
};

export default NotificationDropdown;
