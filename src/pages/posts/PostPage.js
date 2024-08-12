import React, {useState} from 'react';
import {Layout, Typography, Button, Avatar} from 'antd';
import Post from './Post';
import CreatePostModal from './CreatePostModal';
import './PostPage.css';  // Thêm file CSS riêng

const {Content} = Layout;
const {Title} = Typography;

const PostsPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showCreatePostModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const posts = [
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },
        {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        }, {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        }, {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        }, {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        }, {
            user: {
                name: 'John Doe',
                avatar: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg'
            },
            image: 'https://cafefcdn.com/thumb_w/640/203337114487263232/2023/10/26/avatar1698288256028-1698288256554577697100.jpg',
            status: 'Had a great day at the beach!',
            likes: 120,
            likedBy: ['Alice', 'Bob', 'Charlie'],
            comments: 34
        },


        // Thêm các bài viết khác nếu cần
        {
            user: {
                name: 'Jane Smith',
                avatar: 'https://freenice.net/wp-content/uploads/2021/08/hinh-anh-avatar-dep.jpg'
            },
            image: 'https://example.com/post-image2.jpg',
            likes: 85,
            likedBy: ['Dave', 'Eva'],
            comments: 12,
            status: 'Enjoyed a fantastic dinner!'
        }
    ];

    return (
        <Layout style={{minHeight: '100vh', backgroundColor: '#f0f2f5'}}>
            <Content style={{padding: '24px', margin: '0 auto', maxWidth: '1200px'}}>
                {/* Container mô phỏng giao diện Facebook */}
                <div className="create-post-container">
                    <Avatar
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/429973265_3120961174703167_3477680488109187875_n.jpg?stp=cp6_dst-jpg_p120x120&amp;_nc_cat=105&amp;ccb=1-7&amp;_nc_sid=0ecb9b&amp;_nc_eui2=AeF8CENiz_FCiIt_VWUzO5Cn9HpSCSthZiz0elIJK2FmLIyntBL90scrPNG8x_VhvXRSMTGf-DHYubgpmTJni4y5&amp;_nc_ohc=dhiUVYZgqzgQ7kNvgFAK1vx&amp;_nc_ht=scontent.fhan17-1.fna&amp;oh=00_AYBCRher2NmxkyJLeMbl1bogimlscT7TTop5ZXi7NpUMew&amp;oe=66BFC073"
                        size={40}
                    />
                    <Button type="primary" onClick={showCreatePostModal} className="create-post-button">
                        Tạo bài viết
                    </Button>
                </div>

                {posts.map((post, index) => (
                    <Post key={index} post={post}/>
                ))}

                <CreatePostModal
                    visible={isModalVisible}
                    onCancel={handleCancel}
                />
            </Content>
        </Layout>
    );
};

export default PostsPage;
