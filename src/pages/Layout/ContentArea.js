// ContentArea.js
import React from 'react';
import { Layout } from 'antd';
import Posts from "../posts/Posts";

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
       <Posts/>
    </Content>
);

export default ContentArea;
