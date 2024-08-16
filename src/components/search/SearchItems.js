import React, {useEffect, useState} from 'react';
import {Select} from 'antd';
import './SearchItems.css';
import {useDispatch, useSelector} from "react-redux";
import {searchProfile} from "../../redux/services/profileService";
import {searchPost} from "../../redux/services/postService"; // Import file CSS


const SearchItems = () => {
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const contents = useSelector(({ posts }) => posts.listSearch);
    const profiles = useSelector(({ profiles }) => profiles.listSearch);
    // console.log(contents)
    // console.log(profiles)
    const handleSearch = (value) => {
        setSearchValue(value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log("Search value on Enter:", searchValue);
            dispatch(searchProfile(searchValue));
            dispatch(searchPost(searchValue));
        }
    };

    useEffect(() => {
        if (contents.length > 0 || profiles.length > 0) {
            console.log("Search results for posts:", contents);
            console.log("Search results for profiles:", profiles);
        }
    }, [contents, profiles]);
    return (
        <Select
            showSearch
            placeholder="Tìm kiếm..."
            className="search-select"
            suffixIcon={
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" x2="16.65" y1="21" y2="16.65" />
                </svg>
            }
            onSearch={handleSearch} // Bắt sự kiện khi người dùng nhập liệu
            onInputKeyDown={handleKeyDown} // Bắt sự kiện khi người dùng nhấn phím
        >
        </Select>
    );
};

export default SearchItems;
