import React, {useEffect, useState} from 'react';
import {Button, Input, Modal, Select, Typography} from 'antd';
import {PictureOutlined} from '@ant-design/icons';
import './CreatePostModal.css';
import {useDispatch, useSelector} from "react-redux";
import {compressAndEncodeImageFile} from "../../EncodeDecodeImage/compressAndEncodeImageFile";
import {createPost, getAllPostByFollowing} from "../../redux/services/postService";
import {getProfile} from "../../redux/services/profileService";

const {TextArea} = Input;
const {Title} = Typography;
const {Option} = Select;

const CreatePostModal = ({visible, onCancel}) => {
    const [postContent, setPostContent] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [visibility, setVisibility] = useState('PUBLIC');
    const profile = useSelector(({profiles}) => profiles.profile);
    const name = profile.firstName + " " + profile.lastName;
    const email = JSON.parse(localStorage.getItem('currentUser')).email;
    const id = JSON.parse(localStorage.getItem('currentUser')).id;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProfile(email));
    }, [dispatch, email]);
    const handleContentChange = (e) => {
        setPostContent(e.target.value);
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
    };

    const handleSubmit =async () => {
        // Tạo danh sách các URL của ảnh đã chọn
        const postImages = selectedFiles ? await Promise.all(selectedFiles.map(async (file) => {
            return await compressAndEncodeImageFile(file);
        })) : [];
        const post = {
            email:email,
            content:postContent,
            postImages:postImages,
            postStatus:visibility
        }
        dispatch(createPost(post));
        setPostContent('');
        setSelectedFiles([]);
        setVisibility('PRIVATE');
        onCancel();
    };

    const handleSelectChange = (value) => {
        setVisibility(value)
    };

    return (
        <Modal
            title={null}
            visible={visible}
            onCancel={onCancel}
            footer={null}
            width={600}
        >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Title level={4}>{name} ơi, bạn đang nghĩ gì thế?</Title>
                <Select
                    defaultValue="PUBLIC"
                    style={{width: 110, marginRight: '20px'}}
                    onChange={handleSelectChange}
                >
                    <Option value="PUBLIC">Công khai</Option>
                    <Option value="PRIVATE">Chỉ mình tôi</Option>
                </Select>
            </div>
            <TextArea
                rows={4}
                value={postContent}
                onChange={handleContentChange}
                placeholder="Viết nội dung bài viết..."
                style={{marginTop: 20}}
            />
            <div style={{marginTop: 20, display: 'flex', alignItems: 'center'}}>
                <label htmlFor="file-upload" className="CreatePostModal-custom-file-upload">
                    <PictureOutlined style={{marginRight: 10}}/>
                    Ảnh/video
                </label>
                <input
                    id="file-upload"
                    type="file"
                    style={{display: 'none'}}
                    onChange={handleFileChange}
                    multiple
                />
            </div>
            <div style={{marginTop: 20, display: 'flex', flexWrap: 'wrap'}}>
                {selectedFiles.map((file, index) => (
                    <div key={index} style={{marginRight: 10, marginBottom: 10, position: 'relative'}}>
                        <img
                            src={URL.createObjectURL(file)}
                            alt={`preview ${index}`}
                            style={{width: 100, height: 100, objectFit: 'cover'}}
                        />
                    </div>
                ))}
            </div>
            <Button
                type="primary"
                style={{marginTop: 20}}
                onClick={handleSubmit}
            >
                Đăng
            </Button>
        </Modal>
    );
};

export default CreatePostModal;
