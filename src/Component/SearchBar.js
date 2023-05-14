import React from 'react';
import { Input} from 'antd';
import '../CSS/AppHeader.css';
const { Search } = Input;
//设置SearchBar的css样式

const SearchBar: React.FC = () => (
        <Search placeholder="input search text"  style={
            {
                width:500,
                marginTop:15,
            //    设置其在父组件中的位置
                position:'absolute',
                left:'50%',
                marginLeft:-250,
                top:0,
                zIndex:100,

            }}  />
);

export default SearchBar;