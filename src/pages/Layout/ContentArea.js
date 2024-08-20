// ContentArea.js
import React from 'react';
import {Layout} from 'antd';
import PostPage from "../posts/PostPage";

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
       <PostPage/>
    </Content>
);

export default ContentArea;
