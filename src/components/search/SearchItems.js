import React from 'react';
import {Input, Space} from 'antd';

const {Search} = Input;
const onSearch = (value, _e, info) => {
    console.log(info?.source, value);
};

const SearchItems = () => (
    <Space
        direction="vertical"
        style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
        }}
    >
        <Search
            placeholder=""
            onSearch={onSearch}
            style={{width: 200}}
        />
    </Space>
);

export default SearchItems;
