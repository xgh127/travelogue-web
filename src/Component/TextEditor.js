import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../CSS/Editor.css';
import {Descriptions, Input, Menu, Space} from "antd";
import PropTypes from "prop-types";
import MultiSelect from "./MultiSelect";
import ImageUploadButton from "./ImageUploadButton";
import TextArea from "antd/es/input/TextArea";

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
                        value={value} onChange={setValue}
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

                   <Descriptions.Item label='标签选择' span={6}><MultiSelect/></Descriptions.Item>
                       <Descriptions.Item label='封面图片'><ImageUploadButton/></Descriptions.Item>
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
