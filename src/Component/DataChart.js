import React, { useState, useEffect } from 'react';
import {Column} from "@ant-design/plots";
// import { Column } from '@ant-design/plots';

 const DataChart = (props) => {
    const [data, setData] = useState(props.data);

     useEffect(() => {
         setData(props.data);
     }, [props.data]);

    const config = {
        title: {
            visible: true,
            text: props.title,
        },
        data,
        xField: props.x,
        yField: props.y,
        color: '#1ca9e6',
        xAxis: {
            label: {
                autoRotate: false,
            },
        },
        scrollbar: {
            type: 'horizontal',
        },
    };

    return <Column {...config} />;
};
export default DataChart;