import * as React from 'react';
import {Table} from "rsuite";

/**
 * 仅限 Table column 使用
 * 0/1 的 status 状态文字显示
 */
export default React.memo(({ rowData, dataKey, ...props }) => {
    return (
        <Table.Cell {...props}>
            {rowData[dataKey] ?
                <span className={'text-green-500'}>开启中</span>
                :
                <span className={'text-red-500'}>关闭中</span>
            }
        </Table.Cell>
    );
})
