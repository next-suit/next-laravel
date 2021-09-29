import React, {useState, useEffect} from 'react'
import {Pagination} from "rsuite"

const TablePagination = (props) => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(15);

    useEffect(() => {
        setPage(Number(props.current_page || 1));
        setRows(Number(props.per_page || 15));
    }, [props]);

    function onChange(PAGE, ROWS){
        $PAGE = PAGE;
        $ROWS = ROWS;
        props.onChange(PAGE, ROWS);
    }

    return (
        props.last_page > 1 && <Pagination
            className={'my-2'}
            size={'sm'}
            activePage={page}
            prev={true}
            next={true}
            first={true}
            last={true}
            ellipsis={true}
            limit={rows}
            maxButtons={9}
            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
            limitOptions={[15, 30, 100, 200, 500]}
            total={props.total}
            onChangePage={(val) => {
                setPage(val);
                onChange(val, rows);
            }}
            onChangeLimit={(val) => {
                setRows(val)
                onChange(page, val)
            }}
        />
    )
}

export default React.memo(TablePagination);
