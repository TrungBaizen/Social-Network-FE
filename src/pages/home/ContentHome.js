// ContentArea.js
import React from 'react';
import { Layout } from 'antd';
import './ContentHome.css';
import PostsHome from "../posts/PostsHome/PostsHome";

const { Content } = Layout;

const ContentHome = ({ colorBgContainer, borderRadiusLG }) => (
    <Content
        className="content-area"
        style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
        }}
    >
        <PostsHome />
    </Content>
);

export default ContentHome;
