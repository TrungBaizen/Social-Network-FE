import React from 'react';
import styles from './ProfileCard.module.css';

const ProfileCard = () => {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <h2>Mọi người</h2>
            </div>
            <div className={styles.content}>
                <a href="https://www.facebook.com/vuongtunganh">
                    <img
                        src="https://scontent.fhan17-1.fna.fbcdn.net/v/t39.30808-1/452930767_7827386030684745_7120013422841217771_n.jpg?_nc_cat=103&amp;ccb=1-7&amp;_nc_sid=0ecb9b&amp;_nc_ohc=NXm0fWCuHl8Q7kNvgG-Zqeq&amp;_nc_ht=scontent.fhan17-1.fna&amp;oh=00_AYAgkGVNv7czOvFmmz77FhbvgevijbXZRR4ITvZ8z0z34w&amp;oe=66C4BE7F"
                        alt="Vương Tùng Anh"
                        className={styles.profileImage}
                    />
                    <div className={styles.profileInfo}>
                        <span>Vương Tùng Anh</span>
                        <span>2,5K người theo dõi · Sống tại Hà Nội</span>
                        <span>33 bạn chung</span>
                    </div>
                </a>
                <button className={styles.messageButton}>Nhắn tin</button>
            </div>
        </div>
    );
};

export default ProfileCard;
