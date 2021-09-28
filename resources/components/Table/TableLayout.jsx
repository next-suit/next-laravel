import React from "react";
import {Table} from "rsuite";
import TablePagination from "./TablePagination";

export default function TableLayout({data, children, onChange, ...props}){

    return <React.Fragment>
        <Table
            affixHeader
            bordered
            autoHeight
            wordWrap
            data={data.data}
            {...props}
        >
            {children}
        </Table>
        <TablePagination {...data} onChange={(page, rows) => onChange(page, rows)} />
    </React.Fragment>
}
