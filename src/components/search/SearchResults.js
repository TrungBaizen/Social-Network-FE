import React, {useEffect, useState} from 'react';
import './SearchResults.css';
import SearchPost from './SearchPost/SearchPost';
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {decodeAndDecompressImageFile} from "../../EncodeDecodeImage/decodeAndDecompressImageFile";

const SearchResults = () => {
    const posts = useSelector(({posts}) => posts.listSearch);
    const profiles = useSelector(({profiles}) => profiles.listSearch);
    const [avatarImages, setAvatarImages] = useState([]);
    console.log(posts)
    useEffect(() => {
        const fetchAvatarImages = async () => {
            try {
                // Tạo một mảng các promise để giải mã các ảnh
                const decodedImages = await Promise.all(profiles.map(async (profile) => {
                    if (profile.imageAvatar) {
                        const decodeURL = decodeURIComponent(profile.imageAvatar);
                        const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                        return imageUrl;
                    } else {
                        // Trả về ảnh mặc định nếu không có imageAvatar
                        return "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg";
                    }
                }));

                setAvatarImages(decodedImages);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };

        if (profiles && profiles.length > 0) {
            fetchAvatarImages();
        }
    }, [profiles]);
    // Dữ liệu giả lập cho hồ sơ

    // Dữ liệu giả lập cho bài viết tìm kiếm
    // const searchPosts = [
    //     {
    //         authorName: 'Nguyễn Văn A',
    //         avatarImage: 'https://randomuser.me/api/portraits/men/1.jpg',
    //         content: 'Đây là một bài viết tìm kiếm mẫu 1.',
    //         images: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
    //         ],
    //     },
    //     {
    //         authorName: 'Trần Thị B',
    //         avatarImage: 'https://randomuser.me/api/portraits/women/1.jpg',
    //         content: 'Đây là một bài viết tìm kiếm mẫu 2.',
    //         images: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
    //         ],
    //     },
    //     {
    //         authorName: 'Lê Văn C',
    //         avatarImage: 'https://randomuser.me/api/portraits/men/2.jpg',
    //         content: 'Đây là một bài viết tìm kiếm mẫu 3.',
    //         images: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
    //         ],
    //     },
    //     {
    //         authorName: 'Nguyễn Thị D',
    //         avatarImage: 'https://randomuser.me/api/portraits/women/2.jpg',
    //         content: 'Đây là một bài viết tìm kiếm mẫu 4.',
    //         images: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
    //         ],
    //     },
    //     {
    //         authorName: 'Phạm Văn E',
    //         avatarImage: 'https://randomuser.me/api/portraits/men/3.jpg',
    //         content: 'Đây là một bài viết tìm kiếm mẫu 5.',
    //         images: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
    //         ],
    //     },
    //     {
    //         authorName: 'Hoàng Thị F',
    //         avatarImage: 'https://randomuser.me/api/portraits/women/3.jpg',
    //         content: 'Đây là một bài viết tìm kiếm mẫu 6.',
    //         images: [
    //             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlAWkhN0Z9I1EK0F6wYJn9S-g5UvUntZXXoc0_G7PPMUBp4wrLLNmW_yIUZiULYUmqds&usqp=CAU',
    //         ],
    //     },
    //     // Thêm bài viết nếu cần
    // ];

    const handleViewAllProfiles = () => {
        console.log('View All Profiles clicked');
        // Chuyển hướng hoặc hiển thị tất cả hồ sơ tại đây
    };

    return (
        <div className="search-results">
            <div className="results-section">
                <div className="profiles-container">
                    <h2>Hồ Sơ</h2>
                    <div className="profiles">
                        {profiles.length > 0 && profiles.length <= 5 ? (
                            profiles.slice(0, 3).map((profile, index) => (
                                <div className="profile-item" key={profile.user.email}>
                                    <Link to={`/friendsprofile?email=${profile.user.email}`}>
                                        <img src={avatarImages[index] || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"} alt={profile.firstName} />
                                    </Link>
                                    <div className="profile-info">
                                        <Link to={`/friendsprofile?email=${profile.user.email}`}>
                                            <h3>{profile.firstName + " " + profile.lastName}</h3>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : profiles.length > 3 ? (
                            <>
                                {profiles.slice(0, 3).map((profile, index) => (
                                    <div className="profile-item" key={profile.user.email}>
                                        <Link to={`/friendsprofile?email=${profile.user.email}`}>
                                            <img src={avatarImages[index] || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"} alt={profile.firstName} />
                                        </Link>
                                        <div className="profile-info">
                                            <Link to={`/friendsprofile?email=${profile.user.email}`}>
                                                <h3>{profile.firstName + " " + profile.lastName}</h3>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                                <button className="view-all-button" onClick={handleViewAllProfiles}>Xem tất cả</button>
                            </>
                        ) : (
                            <p>Không có hồ sơ nào.</p>
                        )}
                    </div>
                </div>
                <div className="content-container">
                    <h2>Bài Viết</h2>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
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
