import React, { useEffect, useState } from 'react';
import Post from './Post';
import {fetchPostsService} from '../../redux/services/postPageService'
const PostPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const data = await fetchPostsService();
            setPosts(data);
        };

        fetchPosts();
    }, []);

    return (
        <div className="post-page">
            {posts.length > 0 ? (
                posts.map(post => (
                    <Post key={post.id} post={post} />
                ))
            ) : (
                <p>Không có bài viết nào để hiển thị.</p>
            )}
        </div>
    );
};

export default PostPage;