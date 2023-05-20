import {ColumnsType} from "antd/lib/table";

const DEFAULT_COLUMN_WIDTH = 20;

export const generateHeaders=()=> {
    const column = [
        {
            header:'标题',
            key:'Title',
            width: DEFAULT_COLUMN_WIDTH,
        },
        {
            header:'发表时间',
            key:'PublishTime',
            width: DEFAULT_COLUMN_WIDTH,
        },
        {
            header:'标题',
            key:'Title',
            width: DEFAULT_COLUMN_WIDTH,
        },
        {
            header:'标题',
            key:'Title',
            width: DEFAULT_COLUMN_WIDTH,
        },

    ]
}