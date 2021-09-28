import React from "react";
import {Button, DatePicker, DateRangePicker, Table, Form, Input} from "rsuite";
import {logger} from "../../../utils/functions";
import api from "../../../utils/api";
import TableLayout from "../../../components/Table/TableLayout";
import {Plus, Search} from "@rsuite/icons";

export default function Dashboard(props) {
    const [date, setDate] = React.useState(null);
    const [dates, setDates] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState({});
    const [list, setList] = React.useState({});

    async function submit() {
        let res = await api.get('/index/dashboard22', {params: {date, dates}});
        setList(res.list);
    }

    return <div>
        Dashboard
        <div><DateRangePicker value={dates} onChange={value => setDates(value)}/></div>
        <div><DatePicker value={date} onChange={setDate}/></div>
        <div><Button onClick={submit}>Submit</Button></div>
        <div>
            <Form layout={"inline"} formValue={filterValue} onChange={setFilterValue}>
                <Form.Group>
                    <Form.ControlLabel>姓名</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'name'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>姓名2</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'name2'} />
                </Form.Group>
                <Form.Group>
                    <Button type={'submit'} appearance={'primary'}><Search /> 搜索</Button>
                </Form.Group>
            </Form>
        </div>
        <Form layout={"inline"}>
            <Button appearance={'primary'} color={'blue'}><Plus /> <span>添加</span></Button>
        </Form>
        <div>
            <TableLayout data={list} onChange={() => submit()}>
                <Table.Column><Table.HeaderCell>手动方式</Table.HeaderCell><Table.Cell dataKey={'id'}/></Table.Column>
            </TableLayout>
        </div>
    </div>;
}
