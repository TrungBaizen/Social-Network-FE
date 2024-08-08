// ContentArea.js
import React from 'react';
import {Layout} from 'antd';
import Posts from "../posts/Posts";
import ProfilePage from "../profiles/ProfilePage";

const {Content} = Layout;

const ContentArea = ({colorBgContainer, borderRadiusLG}) => (
    <Content
        style={{
            padding: '0 24px',
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
        }}
    >
    </Content>
);

export default ContentArea;
