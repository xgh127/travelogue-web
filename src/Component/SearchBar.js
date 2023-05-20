import React, {useState} from 'react';
import {Input, Select} from 'antd';
import '../CSS/SearchBar.css';
import {Option} from "antd/es/mentions";
import {useNavigate} from "react-router-dom";
const { Search } = Input;
//设置SearchBar的css样式

const SearchBar= () => {
    const navigate = useNavigate();
    const [searchType, setSearchType] = useState(0);

    const handleSearchTypeChange = (value) => {
        console.log(value);
        setSearchType(value);
    };
    const onSearch = (value) => {
        //新开一个页面
        const w = window.open('about:blank');
        w.location.href='/SearchResult?key='+value+'&type='+searchType.toString();
    };
    return(

        <div>
            <Input.Group compact className='searchBar' >
                <Select  style={{ width: '30%',textAlign:'center'}} defaultValue="0" onChange={handleSearchTypeChange}>
                    <Option value="0" >按标题搜索</Option>
                    <Option value="1">按作者搜索</Option>
                    <Option value="2">按内容搜索</Option>
                    <Option value="3">按标签搜索</Option>
                </Select>
                <Search placeholder="input search text"   size={"middle"} style={{ width: '70%'}}   onSearch={onSearch}/>
            </Input.Group>

        </div>

    );
}

export default SearchBar;