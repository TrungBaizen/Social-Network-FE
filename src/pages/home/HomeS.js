import React from 'react';
import { Layout, theme } from 'antd';
import SiderLeft from '../Layout/SiderLeft';
import SiderRight from '../Layout/SiderRight';
import ContentArea from '../Layout/ContentArea';
import FooterComponent from '../Layout/FooterComponent';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";


const HomeS = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout
            style={{
                minHeight: '100vh',
                backgroundColor: '#f0f2f5', // Default background color
            }}
        >
            <ResponsiveAppBar />
            <Layout
                style={{
                    padding: '24px 0',
                    backgroundColor: '#ffffff', // Default background color
                }}
            >
                <SiderLeft colorBgContainer={colorBgContainer} />
                <Layout style={{ padding: '0 24px', minHeight: '100vh' }}>
                    <ContentArea colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
                </Layout>
                <SiderRight colorBgContainer={colorBgContainer} />
            </Layout>
        </Layout>
    );
};

export default HomeS;
