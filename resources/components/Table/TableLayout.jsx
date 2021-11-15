import React from "react";
import {Panel, Table} from "rsuite";
import TablePagination from "./TablePagination";

const TableLayout = ({loading, data, onChange, children, ...props}) => {

    return <Panel bodyFill={true} bordered={false}>
        <Table
            affixHeader
            bordered
            virtualized
            autoHeight
            wordWrap
            loading={!!loading}
            data={data.data}
            {...props}
        >
            {children}
        </Table>
        <TablePagination {...data} onChange={(page, rows) => onChange(page, rows)} />
    </Panel>
};

export default React.memo(TableLayout)
