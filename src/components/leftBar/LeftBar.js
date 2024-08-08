import React, { useContext } from 'react';
import './leftBar.css'; // Đảm bảo đây là file CSS đã biên dịch
import { AuthContext } from '../../context/authContext';
import {
    FaUserFriends as FriendsIcon,
    FaUsers as GroupsIcon,
    FaStore as MarketIcon,
    FaTv as WatchIcon,
    FaRegAddressCard as MemoriesIcon,
    FaCalendarAlt as EventsIcon,
    FaGamepad as GamingIcon,
    FaPhotoVideo as GalleryIcon,
    FaVideo as VideosIcon,
    FaEnvelope as MessagesIcon,
    FaChalkboardTeacher as CoursesIcon,
    FaQuestionCircle as TutorialsIcon,
    FaDollarSign as FundIcon
} from 'react-icons/fa'; // Thay đổi icon từ react-icons/fa tùy theo sự tương ứng của bạn
const LeftBar = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    {currentUser ? (
                        <div className="user">
                            <img src={currentUser.profilePic} alt="Profile" />
                            <span>{currentUser.name}</span>
                        </div>
                    ) : (
                        <div className="user">
                            <span>Guest</span>
                        </div>
                    )}
                    <div className="item">
                        <FriendsIcon />
                        <span>Friends</span>
                    </div>
                    <div className="item">
                        <GroupsIcon />
                        <span>Groups</span>
                    </div>
                    <div className="item">
                        <MarketIcon />
                        <span>Marketplace</span>
                    </div>
                    <div className="item">
                        <WatchIcon />
                        <span>Watch</span>
                    </div>
                    <div className="item">
                        <MemoriesIcon />
                        <span>Memories</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Your shortcuts</span>
                    <div className="item">
                        <EventsIcon />
                        <span>Events</span>
                    </div>
                    <div className="item">
                        <GamingIcon />
                        <span>Gaming</span>
                    </div>
                    <div className="item">
                        <GalleryIcon />
                        <span>Gallery</span>
                    </div>
                    <div className="item">
                        <VideosIcon />
                        <span>Videos</span>
                    </div>
                    <div className="item">
                        <MessagesIcon />
                        <span>Messages</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Others</span>
                    <div className="item">
                        <FundIcon />
                        <span>Fundraiser</span>
                    </div>
                    <div className="item">
                        <TutorialsIcon />
                        <span>Tutorials</span>
                    </div>
                    <div className="item">
                        <CoursesIcon />
                        <span>Courses</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeftBar;
