import React from "react";
import {Button, Form, Input, Table} from "rsuite";
import api from "../../../utils/api";
import Search from "@rsuite/icons/Search";
import TableLayout from "../../../components/Table/TableLayout";
import TableCellEnDis from "../../../components/Table/TableCellEnDis";
import UserDetail from "../../../components/UserDetail";

const Index = (props) => {
    const [list, setList] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [filterValue, setFilterValue] = React.useState({});
    const [userDetail, setUserDetail] = React.useState(0);

    React.useEffect(() => {
        init();
    }, []);

    async function init(){
        let res = await api.get('/user', filterValue);
        setList(res.list);
    }

    return (
        <div>
            <Form layout={'inline'} formValue={filterValue} onChange={setFilterValue} onSubmit={() => {$PAGE=1;init()}}>
                <Form.Group>
                    <Form.ControlLabel>ID</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'id'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>名称</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'name'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>手机号</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'mobile'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>邮箱</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'email'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group>
                    <Button appearance={'primary'} onClick={() => init()}><Search /> 搜索</Button>
                </Form.Group>
            </Form>
            <TableLayout data={list} loading={loading} onChange={() => init()}>
                <Table.Column verticalAlign={"middle"}><Table.HeaderCell>ID</Table.HeaderCell><Table.Cell dataKey={'id'} /></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>名称</Table.HeaderCell><Table.Cell>
                    {row => <a onClick={() => {setUserDetail(row.id)}}>{row.name}</a>}
                </Table.Cell></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>手机号</Table.HeaderCell><Table.Cell dataKey={'mobile'} /></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>邮箱</Table.HeaderCell><Table.Cell dataKey={'email'} /></Table.Column>
                <Table.Column width={60} verticalAlign={"middle"}><Table.HeaderCell>状态</Table.HeaderCell><TableCellEnDis dataKey={'status'} /></Table.Column>
                <Table.Column width={100} verticalAlign={"middle"}><Table.HeaderCell>备注</Table.HeaderCell><Table.Cell dataKey={'remarks'} /></Table.Column>
                <Table.Column width={160} verticalAlign={"middle"}><Table.HeaderCell>创建时间</Table.HeaderCell><Table.Cell dataKey={'created_at'} /></Table.Column>
            </TableLayout>

            <UserDetail value={userDetail} onChange={setUserDetail} />
        </div>
    )
}

export default Index;
