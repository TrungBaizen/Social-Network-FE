import React from 'react';
import { Select } from 'antd';
import './SearchItems.css'; // Import file CSS

const { Option } = Select;

const SearchItems = () => {
    return (
        <Select
            showSearch
            placeholder="Tìm kiếm..."
            className="search-select"
            suffixIcon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>
            }
            // Các thuộc tính khác nếu cần
        >
            {/* Thêm các Option nếu cần */}
            <Option value="option1">Option 1</Option>
            <Option value="option2">Option 2</Option>
            {/* Thay thế bằng dữ liệu của bạn */}
        </Select>
    );
};

export default SearchItems;
