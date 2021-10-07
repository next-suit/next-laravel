import * as React from 'react';
import {Table} from "rsuite";

/**
 * 仅限 Table column 使用
 * 0/1 的 status 状态文字显示
 */
const TableCellEnDis = ({ rowData, dataKey, ...props }) => {
    return (
        <Table.Cell {...props}>
            {rowData[dataKey] ?
                <span className={'text-green-500'}>启用</span>
                :
                <span className={'text-red-500'}>禁用</span>
            }
        </Table.Cell>
    );
};

export default React.memo(TableCellEnDis)
