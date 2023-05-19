import React, {useState} from 'react';
import {Input, Select} from 'antd';
import '../CSS/SearchBar.css';
import {Option} from "antd/es/mentions";
const { Search } = Input;
//设置SearchBar的css样式

const SearchBar: React.FC = () => {
    const [searchType, setSearchType] = useState(0);

    const handleSearchTypeChange = (value) => {
        console.log(value);
        setSearchType(value);
    };
    return(

        <div>
            <Input.Group compact className='searchBar' >
                <Select  style={{ width: '30%',textAlign:'center'}} defaultValue="0" onChange={handleSearchTypeChange}>
                    <Option value="0" >按标题搜索</Option>
                    <Option value="1">按内容搜索</Option>
                    <Option value="2">按作者搜索</Option>
                </Select>
                <Search placeholder="input search text"   size={"middle"} style={{ width: '70%'}}   onSearch={(value) => console.log(value)}/>
            </Input.Group>

        </div>

    );
}

export default SearchBar;