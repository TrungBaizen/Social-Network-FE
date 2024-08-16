import React from 'react';
import { Layout, theme } from 'antd';
import SiderLeft from '../Layout/SiderLeft';
import SiderRight from '../Layout/SiderRight';
import ResponsiveAppBar from "../../components/header/ResponsiveAppBar";
import './Home.css';
import ContentHome from "./ContentHome"; // Import file CSS mới

const Home = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className="home-layout">
            <ResponsiveAppBar />
            <Layout className="main-layout">
                {/* Hiển thị SiderLeft và SiderRight trên màn hình lớn */}
                <SiderLeft colorBgContainer={colorBgContainer} />
                <Layout className="content-layout">
                    <ContentHome colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
                </Layout>
                <SiderRight colorBgContainer={colorBgContainer} />
            </Layout>
        </Layout>
    );
};

export default Home;
