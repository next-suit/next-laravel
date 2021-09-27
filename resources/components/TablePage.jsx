import React, {useState, useEffect} from 'react'
import {Table} from "rsuite"

export default React.memo(props => {
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(15);

    useEffect(() => {
        setPage(Number(props.current_page));
        setRows(Number(props.per_page));
    }, [props]);

    function onChange(PAGE, ROWS){
        $PAGE = PAGE;
        $ROWS = ROWS;
        props.onChange(PAGE, ROWS);
    }

    return (
        <Table.Pagination
            activePage={page}
            displayLength={rows}
            maxButtons={9}
            lengthMenu={[
                {
                    value: 15,
                    label: 15
                },
                {
                    value: 30,
                    label: 30
                },
                {
                    value: 100,
                    label: 100
                },
                {
                    value: 200,
                    label: 200
                },
                {
                    value: 500,
                    label: 500
                }
            ]}
            total={props.total}
            onChangePage={(val) => {
                setPage(val);
                onChange(val, rows);
            }}
            onChangeLength={(val) => {
                setRows(val)
                onChange(page, val)
            }}
        />
    )
})
