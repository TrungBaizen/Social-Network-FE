import React from 'react';
import './Profile.css';

const friends = [
    { name: "Minh Chang Nguyen", image: "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/279357242_1954012328135292_6023573157459998302_n.jpg?stp=dst-jpg_p100x100&_nc_cat=106&ccb=1-7&_nc_sid=50d2ac&_nc_ohc=VhiipztEd5sQ7kNvgGYvu2b&_nc_ht=scontent.fhan17-1.fna&oh=00_AYByfbd2PyCK2bQdWS8I0ad7Qnu7t7W12RKrWI-11tzOwQ&oe=66B95907" },
    { name: "Trần Thị Thoan", image: "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/279059838_3105340363053121_8521916918331534956_n.jpg?stp=dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=jnL86QEbmOAQ7kNvgERneWO&_nc_ht=scontent.fhan17-1.fna&oh=00_AYCsMiHcBmHiaS4DsjPMbNNEW20W6WQm8Xf5281GBKm1oA&oe=66B93F9E" },
    { name: "Lương Tuấn Nghĩa", image: "https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/434656608_6729838727119133_6707261427586636003_n.jpg?stp=dst-jpg_p100x100&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=oK-C0WoBaEQQ7kNvgGG&oe=66B93F9E" }
];

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="avatar-container">
                <svg className="avatar-svg" role="img">
                    <mask id="avatar-mask">
                        <circle cx="84" cy="84" fill="white" r="84"></circle>
                    </mask>
                    <g mask="url(#avatar-mask)">
                        <image
                            x="0"
                            y="0"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            width="100%"
                            xlinkHref="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/429973265_3120961174703167_3477680488109187875_n.jpg?stp=cp6_dst-jpg_p720x720&_nc_cat=105&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=Pg6K_TPfSTEQ7kNvgHGPnww&_nc_ht=scontent.fhan17-1.fna&oh=00_AYBimOe38IG-Vt3YGGTW4yBCCu_myLGmT7kzzHTv2pMP4g&oe=66B96133"
                        />
                        <circle className="avatar-border" cx="84" cy="84" r="84"></circle>
                    </g>
                </svg>
            </div>
            <div className="user-info">
                <h1>Tran Ngoc Duy <span>(子腾)</span></h1>
                <a href="https://www.facebook.com/tnd18091995/friends/" className="friends-link">571 người bạn</a>
            </div>
            <div className="friends-list">
                {friends.map((friend, index) => (
                    <div key={index} className="friend-item">
                        <a href="https://www.facebook.com/tnd18091995/friends/">
                            <svg className="friend-avatar" role="img">
                                <mask id={`friend-mask-${index}`}>
                                    <circle cx="16" cy="16" fill="white" r="16"></circle>
                                </mask>
                                <g mask={`url(#friend-mask-${index})`}>
                                    <image
                                        x="0"
                                        y="0"
                                        height="100%"
                                        preserveAspectRatio="xMidYMid slice"
                                        width="100%"
                                        xlinkHref={friend.image}
                                    />
                                    <circle className="avatar-border" cx="16" cy="16" r="16"></circle>
                                </g>
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
