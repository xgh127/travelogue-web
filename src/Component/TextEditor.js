import React, {useEffect, useState} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CSS/Editor.css';
import {Button, Card, Descriptions, Input, Tooltip, Typography} from "antd";
import PropTypes from "prop-types";
import MultiSelect from "./MultiSelect";
import {doGet, doJSONPost} from "../Utils/ajax";
import { Constant } from "../Utils/constant";
import { PostFailMsg, PostSuccessMsg } from "../Utils/Message";
import { compressImage, getBase64 } from "../Utils/imageUtils";
import TextArea from "antd/es/input/TextArea";
import {getSensitive, SensitiveWordsFilter} from "../Utils/Sensitive";
import {useNavigate} from "react-router-dom";

const {Paragraph } = Typography;
const options = [
    { label: 'nature ', value: '1' },
    { label: 'view', value: '2' },
    {
        label: 'holiday getaway ',value: '3',
    },
    {
        label: 'shopping mecca',value: '4',
    },
    {
    label: 'Thrilling exploration',value: '5'
    },
    {
     label: 'self-guided tour',value: '6'
    },
    {
    label: 'spring outing',value: '7'
    },
    {
        label: 'Ancient City and Town',value: '8'
    },
    {

    }
    // ... 其他选项
];

const placeholder = '请选择标签';

const time = new Date();

const Editor = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [abstract, setAbstract] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [compressedImage, setCompressedImage] = useState(null); // 添加compressedImage状态
    //增加预览状态属性
    const [preview, setPreview] = useState(false);
    const navigate = useNavigate();

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

    // useEffect(() => {
    //     // console.log("选中的标签", selectedTags);
    // }, [selectedTags]);

    const handleAbstractChange = (e) => {
        setAbstract(e.target.value);
    };
    const handleSensitiveCheck = async () => {
        // Usage example:
        const sensitiveWords = ['hello', 'world', 'openai'];
        let stored = await getSensitive();
        for (let i = 0; i < stored.length; i++) {
            sensitiveWords.push(stored[i]);
        }
        console.log(sensitiveWords);
        const filter = new SensitiveWordsFilter();
        sensitiveWords.forEach((word) => filter.addWord(word));

        const text = value;
        const filteredText = filter.filter(text);
        console.log("output=" + filteredText); // Output: "*****, *****! This is an example sentence."
        // console.log("敏感词检测"+value);
        setValue(filteredText);
        // console.log("")
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0]; // 获取用户选择的图片文件
        console.log(file);
        if (file) {
            try {
                const compressedImageResult = await compressImage(file); // 压缩图片
                setCompressedImage(compressedImageResult); // 设置compressedImage状态
                const base64Data = await getBase64(compressedImageResult); // 将图片转换为Base64编码
                console.log("size = "+base64Data.length);
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
            "PublishTime": time,
        };

        console.log("data", data); // 打印出json数据
        let resp = await doJSONPost('/Travelogue', data);
        console.log(resp);
        if (resp.code === 0) {
            // PostSuccessMsg();
            navigate('/SubmitSuccessView');
        } else {
            PostFailMsg();
        }
        tagIds.length = 0;
    };

    useEffect(() => {
        // 根据游记ID获取游记信息的异步函数，例如：
        const fetchTravelogue = async (travelogueId) => {
            try {
                // 发起请求获取游记信息
                const response = await doGet(`/Travelogue/${travelogueId}`);
                const travelogueData = response.data;
                console.log("要修改的游记",travelogueData);
                console.log(travelogueData.Title)
                // 将游记信息填充到输入框中
                setTitle(travelogueData.Title);
                setValue(travelogueData.Content);
                setAbstract(travelogueData.abstract);
                // 其他输入框的填充操作...
            } catch (error) {
                console.error('获取游记信息失败:', error);
            }
        };

        // 从URL或路由参数中获取游记ID
        const travelogueId = window.location.search.split('=')[1];// 从URL或路由参数中获取游记ID的逻辑，例如：props.match.params.travelogueId;

            // 调用获取游记信息的函数
            fetchTravelogue(travelogueId);
    }, []);

    const handleSave = async () =>{
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
            "Status": 0,
            "Author": {
                "id":id
            },
            "Tag": tagIds.map((tagId) => {
                return { "id": tagId };
            }),
            "cover": imageUrl, // 添加图片信息
            "PublishTime": time,
        };
        const travelogueId = window.location.search.split('=')[1];
        console.log("data", data); // 打印出json数据
        let resp = await doJSONPost('/Travelogue/', data);
        console.log(resp);
        if (resp.code === 0) {
            PostSuccessMsg();
            navigate("/");
        } else {
            PostFailMsg();
        }
        tagIds.length = 0;
    }

    function handlePreview() {
        // alert("预览"+JSON.stringify(value));
        setPreview(true);
    }
    if (!preview){
        return (
            <div className="editor-container">
                <div className="editor-header">
                    <div className="editor-title">
                        <Tooltip title={'仅支持英文'}>
                            <Input type="text"
                                   value={title}
                                   onChange={handleTitleChange}
                                   style={{ textAlign: 'center' }}
                                   placeholder="请输入标题" />
                        </Tooltip>
                    </div>
                    <Tooltip title={"仅支持英文游记上传！"}>
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
                    </Tooltip >
                </div>

                <Card className="editor-footer">
                    <Descriptions title={'发布设置'}>
                        <Descriptions.Item label='标签选择' span={6}>
                            <MultiSelect
                                placeholder={placeholder}
                                options={options}
                                onChange={handleTagChange}
                            />
                        </Descriptions.Item>
                        <Descriptions.Item label='封面图片'>
                            <Tooltip title={"注意图片名称不能有中文"}>
                                <input type="file" accept="image/*" onChange={handleImageUpload} />
                                {imageUrl && (
                                    <img src={URL.createObjectURL(compressedImage)} alt="压缩后的图片" />
                                )}
                            </Tooltip>
                        </Descriptions.Item>

                        <Descriptions.Item label='摘要'>
                            <Tooltip title={'仅支持英文'}>
                                <TextArea rows={4} value={abstract} onChange={handleAbstractChange} />
                            </Tooltip >
                        </Descriptions.Item>

                    </Descriptions>

                    <div className="preview-update-buttons">
                        <button className="preview-button" onClick={handlePreview}>预览</button>
                        <button className="save-button" onClick={handleSave}>保存</button>
                        <button className="update-button" onClick={handleSubmit}>上传</button>
                        <Tooltip title="敏感词检测,将会把敏感词以**替换，请您发现后及时修改">
                            <button className="sensitive-button"
                                    onClick={handleSensitiveCheck}

                            >敏感词检测
                            </button>
                        </Tooltip>

                    </div>
                </Card>
            </div>
        );
    }
    else {
      return(
          <div className='travelogue-details-container'>
          {/* 游记信息展示条 */}
          <Card >
              <div className="travelogue-info" >
                  <div className="avatar-title-preview" >
                      <h2 style={{fontSize:24}}>{title}</h2>
                  </div>

              </div>
          </Card>
          {/* 游记内容展示 */}
              <Card>
              <Paragraph ellipsis={{ rows: 6, expandable: true, symbol: '展开'}}>
                  <div style={{fontSize:20,textAlign:'left'}} dangerouslySetInnerHTML={{ __html:value }} />
              </Paragraph>
              </Card>
              <Card>
                  <Button type="primary" onClick={()=>{setPreview(false)}}>继续编辑</Button>
              </Card>

      </div>
      )
    }

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
