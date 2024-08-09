import React from 'react';
import { Layout, theme } from 'antd';
import SiderLeft from '../Layout/SiderLeft';
import SiderRight from '../Layout/SiderRight';
import ContentArea from '../Layout/ContentArea';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import './Home.css'; // Import file CSS mới

const Home = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className="home-layout">
            <ResponsiveAppBar />
            <Layout className="main-layout">
                <SiderLeft colorBgContainer={colorBgContainer} />
                <Layout className="content-layout">
                    <ContentArea colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
                </Layout>
                <SiderRight colorBgContainer={colorBgContainer} />
            </Layout>
        </Layout>
    );
};

export default Home;
