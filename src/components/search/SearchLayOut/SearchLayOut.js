import React from 'react';
import { Layout, theme } from 'antd';
import './SearchLayOut.css';
import ResponsiveAppBar from "../../header/ResponsiveAppBar";
import SiderLeft from "../../../pages/Layout/SiderLeft";
import SearchResults from "../SearchResults";
import SiderRight from "../../../pages/Layout/SiderRight"; // Import file CSS mới cho SearchLayout

const SearchLayout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <Layout className="search-layout">
            <ResponsiveAppBar />
            <Layout className="main-layout">
                {/* Hiển thị SiderLeft và SiderRight trên màn hình lớn */}
                <SiderLeft colorBgContainer={colorBgContainer} />
                <Layout className="content-layout">
                    <SearchResults colorBgContainer={colorBgContainer} borderRadiusLG={borderRadiusLG} />
                </Layout>
                <SiderRight colorBgContainer={colorBgContainer} />
            </Layout>
        </Layout>
    );
};

export default SearchLayout;
