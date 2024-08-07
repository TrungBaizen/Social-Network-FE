// ContentArea.js
import React from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentArea = ({ colorBgContainer, borderRadiusLG }) => (
    <Content
        style={{
            padding: '0 24px',
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
        }}
    >
        Content
    </Content>
);

export default ContentArea;
