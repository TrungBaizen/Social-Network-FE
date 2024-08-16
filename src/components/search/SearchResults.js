import React from 'react';
import './SearchResults.css';
import SearchPost from './SearchPost/SearchPost';

const SearchResults = () => {
    // Dữ liệu giả lập cho hồ sơ
    const profiles = [
        { name: 'Nguyễn Văn A', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { name: 'Trần Thị B', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
        { name: 'Lê Văn C', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
        { name: 'Nguyễn Thị D', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
        { name: 'Phạm Văn E', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
        { name: 'Hoàng Thị F', avatar: 'https://randomuser.me/api/portraits/women/3.jpg' },
        // Thêm hồ sơ nếu cần
    ];

    // Dữ liệu giả lập cho bài viết tìm kiếm
    const searchPosts = [
        {
            authorName: 'Nguyễn Văn A',
            avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg',
            content: 'Đây là một bài viết tìm kiếm mẫu 1.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
            ],
        },
        {
            authorName: 'Trần Thị B',
            avatarImage: 'https://randomuser.me/api/portraits/women/1.jpg',
            content: 'Đây là một bài viết tìm kiếm mẫu 2.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
            ],
        },
        {
            authorName: 'Lê Văn C',
            avatarImage: 'https://randomuser.me/api/portraits/men/2.jpg',
            content: 'Đây là một bài viết tìm kiếm mẫu 3.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
            ],
        },
        {
            authorName: 'Nguyễn Thị D',
            avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg',
            content: 'Đây là một bài viết tìm kiếm mẫu 4.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
            ],
        },
        {
            authorName: 'Phạm Văn E',
            avatarImage: 'https://randomuser.me/api/portraits/men/3.jpg',
            content: 'Đây là một bài viết tìm kiếm mẫu 5.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
            ],
        },
        {
            authorName: 'Hoàng Thị F',
            avatarImage: 'https://randomuser.me/api/portraits/women/3.jpg',
            content: 'Đây là một bài viết tìm kiếm mẫu 6.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
            ],
        },
        // Thêm bài viết nếu cần
    ];

    return (
        <div className="search-results">
            <div className="results-section">
                <div className="profiles-container">
                    <h2>Hồ Sơ</h2>
                    <div className="profiles">
                        {profiles.length > 0 ? (
                            profiles.slice(0, 5).map((profile, index) => (
                                <div className="profile-item" key={index}>
                                    <img src={profile.avatar} alt={profile.name} />
                                    <div className="profile-info">
                                        <h3>{profile.name}</h3>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>Không có hồ sơ nào.</p>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    <h2>Bài Viết</h2>
                    {searchPosts.length > 0 ? (
                        searchPosts.map((post, index) => (
                            <SearchPost key={index} post={post} />
                        ))
                    ) : (
                        <p>Không có bài viết nào.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchResults;
