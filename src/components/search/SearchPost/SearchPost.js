import React, {useEffect, useState} from 'react';
import {Avatar, Card, Typography} from 'antd';
import './SearchPost.css';
import {decodeAndDecompressImageFile} from "../../../EncodeDecodeImage/decodeAndDecompressImageFile";
import {Link} from "react-router-dom";

const {Title, Text} = Typography;

const SearchPost = ({post}) => {
    const [avatarImage, setAvatarImage] = useState('');
    const [decodeImages, setDecodeImages] = useState([]);
    const [liked, setLiked] = useState(false);
    const currentUserEmail = JSON.parse(localStorage.getItem('currentUser')).email;

    useEffect(() => {
        const fetchImage = async () => {
            try {
                if (post.imageAvatar) {
                    const decodeURL = decodeURIComponent(post.imageAvatar);
                    const imageUrl = await decodeAndDecompressImageFile(decodeURL);
                    setAvatarImage(imageUrl);
                } else {
                    setAvatarImage("https://images2.thanhnien.vn/528068263637045248/2024/6/24/1685813204821-17191939968261579561198.jpeg");
                }
            } catch (error) {
                console.error('Error decoding image:', error);
            }
        };
        if (post) {
            fetchImage();
        }
    }, [post]);

    useEffect(() => {
        const fetchDecodedImages = async () => {
            try {
                const postList = post.postImages;
                const decodeImageList = postList && postList.length > 0
                    ? await Promise.all(postList.map(async (post) => {
                        return await decodeAndDecompressImageFile(decodeURIComponent(post.image));
                    }))
                    : [];
                setDecodeImages(decodeImageList);
            } catch (error) {
                console.error('Error decoding images:', error);
            }
        };
        fetchDecodedImages();
    }, [post.postImages]);
    const handleLikeClick = () => {
        setLiked(!liked); // Toggle like state
    };

    const generateProfileLink = (email) => {
        return email === currentUserEmail ? `/profile` : `/friendsprofile?email=${email}`;
    };

    return (
        <Card className="search-post-card">
            <div className="search-post-header">
                <Link to={generateProfileLink(post.email)} style={{textDecoration: 'none'}}>
                <Avatar src={avatarImage}/>
                </Link>
                <Link to={generateProfileLink(post.email)} style={{textDecoration: 'none'}}>
                    <Title level={4} style={{marginLeft: 10}}>
                        {post.firstName + " " + post.lastName}
                    </Title>
                </Link>
            </div>
            <div className="search-post-content">
                <Text>{post.content}</Text>
                <div className="search-post-images">
                    {decodeImages && decodeImages.length > 0 ? (
                        decodeImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Post Image ${index + 1}`}
                                className="search-post-image"
                            />
                        ))
                    ) : null}
                </div>
            </div>
            {/*<div className="search-post-stats">*/}
            {/*    {liked ? (*/}
            {/*        <>*/}
            {/*            <LikeFilled style={{marginRight: 8, color: '#1890ff'}}/> {post.likes + 1} lượt thích*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <>*/}
            {/*            <LikeOutlined style={{marginRight: 8}}/> {post.likes} lượt thích*/}
            {/*        </>*/}
            {/*    )}*/}
            {/*</div>*/}
            <button className="like-button" onClick={handleLikeClick}>
                {liked ? 'Đã thích' : 'Thích'}
            </button>
        </Card>
    );
};

export default SearchPost;
