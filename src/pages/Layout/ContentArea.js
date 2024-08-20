import React from 'react';
import { Layout } from 'antd';
import PostPage from "../posts/PostPage";
import './ContentArea.css';

const { Content } = Layout;

const ContentArea = ({ colorBgContainer, borderRadiusLG }) => {
    // Set CSS variables to use props in the CSS file
    document.documentElement.style.setProperty('--colorBgContainer', colorBgContainer);
    document.documentElement.style.setProperty('--borderRadiusLG', borderRadiusLG);

    return (
        <Content className="content-area">
            <PostPage />
        </Content>
    );
};

export default ContentArea;
