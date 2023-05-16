import React from 'react';
import { Select} from 'antd';
import type { SelectProps } from 'antd';
//example from https://ant.design/components/select/#components-select-demo-multiple
const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
    options.push({
        label: i.toString(36) + i,
        value: i.toString(36) + i,
    });
}
const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};

const MultiSelect: React.FC = (props) => (
        <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder={props.placeholder}
            onChange={handleChange}
            options={props.options}
        />
);

export default MultiSelect