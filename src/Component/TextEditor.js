import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CSS/Editor.css';
import { Descriptions, Input } from "antd";
import PropTypes from "prop-types";
import MultiSelect from "./MultiSelect";
import { doJSONPost } from "../Utils/ajax";
import { Constant } from "../Utils/constant";
import { PostFailMsg, PostSuccessMsg } from "../Utils/Message";
import ImageUploadButton from "./ImageUploadButton";
import { compressImage, getBase64 } from "../Utils/imageUtils";
import TextArea from "antd/es/input/TextArea";

const options = [
    { label: 'nature', value: '1' },
    { label: 'view', value: '2' },
    // ... 其他选项
];

const placeholder = '请选择标签';

const Editor = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [abstract, setAbstract] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [compressedImage, setCompressedImage] = useState(null); // 添加compressedImage状态

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleTagChange = (value) => {
        const selectedTagLabels = value.map((selectedValue) => {
            const option = options.find((option) => option.value === selectedValue);
            return option.label;
        });
        setSelectedTags(selectedTagLabels);
    };

    useEffect(() => {
        console.log("选中的标签", selectedTags);
    }, [selectedTags]);

    const handleAbstractChange = (e) => {
        setAbstract(e.target.value);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // 获取用户选择的图片文件
        console.log(file);
        if (file) {
            try {
                const compressedImageResult = await compressImage(file); // 压缩图片
                setCompressedImage(compressedImageResult); // 设置compressedImage状态
                const base64Data = await getBase64(compressedImageResult); // 将图片转换为Base64编码
                console.log(base64Data);
                setImageUrl(base64Data);
            } catch (error) {
                // 处理错误情况
                console.error('图片上传失败：', error);
            }
        }
    };

    const handleSubmit = async () => {
        // 处理标签
        const tagIds = [];
        for (const selectedTag of selectedTags) {
            const data = {
                "Name": selectedTag,
            };
            let res = await doJSONPost('/Tag', data);
            console.log(res);
            let tagId = res.data.id;
            tagIds.push(tagId);
            console.log(tagIds);
        };

        let user = localStorage.getItem(Constant.USER);
        let id = JSON.parse(user).id;
        const data = {
            "Title": title,
            "Content": value,
            "abstract": abstract,
            "Status": 1,
            "Author": {
                "id":id
            },
            "Tag": tagIds.map((tagId) => {
                return { "id": tagId };
            }),
            "cover": imageUrl, // 添加图片信息
        };

        console.log("data", data); // 打印出json数据
        let resp = await doJSONPost('/Travelogue', data);
        console.log(resp);
        if (resp.code === 0) {
            PostSuccessMsg();
        } else {
            PostFailMsg();
        }
        tagIds.length = 0;
    };

    return (
        <div className="editor-container">
            <div className="editor-header">
                <div className="editor-title">
                    <Input type="text"
                           value={title}
                           onChange={handleTitleChange}
                           style={{ textAlign: 'center' }}
                           placeholder="请输入标题" />
                </div>
                <div className="editor-toolbar">
                    <ReactQuill
                        theme="snow"
                        placeholder={'请输入正文'}
                        value={value}
                        onChange={setValue}
                        className='editor-placeholder'
                        formats={Editor.formats}
                        modules={{
                            toolbar: {
                                container: [
                                    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                                    [{ size: [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' },
                                        { 'indent': '-1' }, { 'indent': '+1' }],
                                    ['link', 'image', 'video'],
                                    ['clean']
                                ],
                                clipboard: {
                                    // toggle to add extra line breaks when pasting HTML:
                                    matchVisual: false,
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <div className="editor-footer">
                <Descriptions title={'发布设置'}>
                    <Descriptions.Item label='标签选择' span={6}>
                        <MultiSelect
                            placeholder={placeholder}
                            options={options}
                            onChange={handleTagChange}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label='封面图片'>
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                        {imageUrl && (
                            <img src={URL.createObjectURL(compressedImage)} alt="压缩后的图片" />
                        )}
                    </Descriptions.Item>
                    <Descriptions.Item label='摘要'>
                        <TextArea rows={4} value={abstract} onChange={handleAbstractChange} />
                    </Descriptions.Item>
                </Descriptions>

                <div className="preview-update-buttons">
                    <button className="preview-button">预览</button>
                    <button className="update-button" onClick={handleSubmit}>更新</button>
                </div>
            </div>
        </div>
    );
};

Editor.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
];

Editor.propTypes = {
    placeholder: PropTypes.string,
};

export default Editor;
