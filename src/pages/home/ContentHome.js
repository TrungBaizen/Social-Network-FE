// ContentArea.js
import React from 'react';
import { Layout } from 'antd';
import './ContentHome.css';
import HomePosts from "../posts/HomePosts/HomePosts";

const { Content } = Layout;

const ContentHome = ({ colorBgContainer, borderRadiusLG }) => (
    <Content
        className="content-area"
        style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
        }}
    >
        <HomePosts />
    </Content>
);

export default ContentHome;
