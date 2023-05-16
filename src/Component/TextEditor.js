import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CSS/Editor.css';
import {Descriptions, Input} from "antd";
import PropTypes from "prop-types";
import MultiSelect from "./MultiSelect";
import ImageUploadButton from "./ImageUploadButton";
import TextArea from "antd/es/input/TextArea";
import {SelectProps} from "antd";
const options: SelectProps['options'] = [
    {label: '自然风光', value: '1'},
    {label: '人文风光', value: '2'},
    {label: '美食探索', value: '3'},
    {label: '冒险探索', value: '4'},
    {label: '城市探索', value: '5'},
    {label: '历史遗迹', value: '6'},
    {label: '自由行', value: '7'},
    {label: '情侣出行', value: '8'},
    {label: '家庭出行', value: '9'},
    {label: '春季之旅', value: '10'},
    {label: '夏季之旅', value: '11'},
    {label: '秋季之旅', value: '12'},
    {label: '冬季之旅', value: '13'},
];
const placeholder = '请选择标签';

const Editor = () => {
    const [value, setValue] = useState('');
    const [title, setTitle] = useState('');

    return (
        <div className="editor-container">
            <div className="editor-header">
                <div className="editor-title">
                    <Input type="text"
                           onPressEnter={setTitle}
                            style={{textAlign:'center'}}
                           placeholder="请输入标题"/>
                </div>
                <div className="editor-toolbar">
                    <ReactQuill
                        theme="snow"
                        placeholder={'请输入正文'}
                        value={value} onChange={(value) => {
                            setValue(value);
                            console.log("value"+value);
                        }
                    }
                        className='editor-placeholder'
                        formats={Editor.formats}
                        modules={{
                            toolbar: {
                                container: [
                                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                                    [{size: []}],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{'list': 'ordered'}, {'list': 'bullet'},
                                        {'indent': '-1'}, {'indent': '+1'}],
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
                        <Descriptions title={'发布设置'} >

                   <Descriptions.Item label='标签选择' span={6}><MultiSelect
                       placeholder={placeholder}
                       options={options}/></Descriptions.Item>
                       <Descriptions.Item label='封面图片'>
                           <ImageUploadButton/>
                       </Descriptions.Item>
                   <Descriptions.Item label='摘要'><TextArea rows={4}/></Descriptions.Item>
                        </Descriptions>


                <div className="preview-update-buttons">
                    <button className="preview-button">预览</button>
                    <button className="update-button">更新</button>
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
]
Editor.propTypes = {
    placeholder: PropTypes.string,
}


export default Editor;
