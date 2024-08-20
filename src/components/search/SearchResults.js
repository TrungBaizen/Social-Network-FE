import React, { useEffect, useState } from 'react';
import './SearchResults.css';
import SearchPost from './SearchPost/SearchPost';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { decodeAndDecompressImageFile } from "../../EncodeDecodeImage/decodeAndDecompressImageFile";

const SearchResults = () => {
    const posts = useSelector(({ posts }) => posts.listSearch);
    const profiles = useSelector(({ profiles }) => profiles.listSearch);
    const [avatarImages, setAvatarImages] = useState([]);
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;

    useEffect(() => {
        const fetchAvatarImages = async () => {
            try {
                const decodedImages = await Promise.all(profiles.map(async (profile) => {
                    if (profile.imageAvatar) {
                        const decodeURL = decodeURIComponent(profile.imageAvatar);
                        const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                        return imageUrl;
                    } else {
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

    const handleViewAllProfiles = () => {
        console.log('View All Profiles clicked');
        // Chuyển hướng hoặc hiển thị tất cả hồ sơ tại đây
    };

    const generateProfileLink = (email) => {
        return email === currentUserEmail ? `/profile` : `/friendsprofile?email=${email}`;
    };

    const filteredPosts = posts.filter(post =>
        post.email === currentUserEmail || post.postStatus !== 'PRIVATE'
    );

    console.log(filteredPosts)
    return (
        <div className="search-results">
            <div className="results-section">
                <div className="profiles-container">
                    <h2>Hồ Sơ</h2>
                    <div className="profiles">
                        {profiles.length > 0 && profiles.length <= 5 ? (
                            profiles.slice(0, 3).map((profile, index) => (
                                <div className="profile-item" key={profile.user.email}>
                                    <Link to={generateProfileLink(profile.user.email)}>
                                        <img src={avatarImages[index] || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"} alt={profile.firstName} />
                                    </Link>
                                    <div className="profile-info">
                                        <Link to={generateProfileLink(profile.user.email)}>
                                            <h3>{profile.firstName + " " + profile.lastName}</h3>
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : profiles.length > 3 ? (
                            <>
                                {profiles.slice(0, 3).map((profile, index) => (
                                    <div className="profile-item" key={profile.user.email}>
                                        <Link to={generateProfileLink(profile.user.email)} style={{textDecoration: 'none'}}>
                                            <img src={avatarImages[index] || "https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg"} alt={profile.firstName} />
                                        </Link>
                                        <div className="profile-info">
                                            <Link to={generateProfileLink(profile.user.email)} style={{textDecoration: 'none'}}>
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
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map((post, index) => (
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
