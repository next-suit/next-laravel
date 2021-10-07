import React from "react";
import {Panel, Table} from "rsuite";
import TablePagination from "./TablePagination";

const TableLayout = ({loading, data, children, onChange, ...props}) => {

    return <Panel bodyFill={true}>
        <Table
            affixHeader
            bordered
            autoHeight
            wordWrap
            loading={loading}
            data={data.data}
            {...props}
        >
            {children}
        </Table>
        <TablePagination {...data} onChange={(page, rows) => onChange(page, rows)} />
    </Panel>
};

export default React.memo(TableLayout)
