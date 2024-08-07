// FooterComponent.js
import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => (
    <Footer
        style={{
            textAlign: 'center',
        }}
    >
        TDH Social Network©{new Date().getFullYear()} Created by Ant UED
    </Footer>
);

export default FooterComponent;
