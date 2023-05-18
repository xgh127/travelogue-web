import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const MultiSelect = ({ placeholder, options, onChange }) => (
    <Select
        mode="multiple"
        allowClear
        style={{ width: '100%' }}
        placeholder={placeholder}
        onChange={onChange}
    >
        {options.map((option) => (
            <Option key={option.value} value={option.value}>
                {option.label}
            </Option>
        ))}
    </Select>
);

export default MultiSelect;
