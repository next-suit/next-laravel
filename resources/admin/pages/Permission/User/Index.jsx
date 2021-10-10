import React, {useEffect, useState, useRef} from 'react'
import {
    ButtonGroup,
    Button,
    Panel,
    Table,
    Modal,
    Form,
    Schema,
    Whisper,
    Popover,
    SelectPicker, Input, Icon
} from "rsuite"
import api from "../../../../utils/api"
import {datetime, toast} from "../../../../utils/functions"
import {Switch, Route, useHistory, useLocation, useParams} from 'react-router-dom';
import TableCellEnDis from "../../../../components/Table/TableCellEnDis";
import TableLayout from "../../../../components/Table/TableLayout";
import Plus from "@rsuite/icons/Plus";
import Search from "@rsuite/icons/Search";
import TableConformButton from "../../../../components/Table/TableConformButton";

export default function Index(props){
    const [list, setList] = React.useState({})
    const [loading, setLoading] = React.useState(false)
    const [filterValues, setFilterValues] = React.useState({name: ''})
    const history = useHistory();

    React.useEffect(() => {
        init()
    }, []);

    async function init() {
        setLoading(true);
        let res = await api.get('/permission/user', {params:filterValues})
        setList(res);
        setLoading(false)
    }

    async function edit(id) {
        history.push(`/permission/user/${id}/edit`);
    }

    async function del(id) {
        let res = await api.delete('/permission/user/' + id);
        init();
        toast('删除完成', 'success');
    }

    return (
        <div>
            <Form layout={'inline'}
                  model={Schema.Model({
                      name: Schema.Types.StringType(),
                      email: Schema.Types.StringType(),
                  })}
                  onChange={(filterValues) => setFilterValues(filterValues)}
                  formValue={filterValues}
                  onSubmit={async (e) => {
                      // e.preventDefault();
                      $PAGE = 1;
                      await init();
                  }}
            >
                <Form.Group>
                    <Form.ControlLabel>用户名</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'name'} autoComplete={'off'}/>
                </Form.Group>
                <Form.Group>
                    <Button appearance="primary" type={'submit'}><Search /> 搜索</Button>
                </Form.Group>
            </Form>
            <Form layout={'inline'}>
                <Button appearance={'primary'} onClick={() => edit(0)}><Plus /> 添加</Button>
            </Form>
            <TableLayout loading={loading} data={list} onChange={() => init()}>
                <Table.Column width={60} verticalAlign={"middle"}><Table.HeaderCell>ID</Table.HeaderCell><Table.Cell dataKey={'id'}/></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>用户名</Table.HeaderCell><Table.Cell dataKey={'name'}/></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>所属分组</Table.HeaderCell><Table.Cell>
                    {row => row.group.name}
                </Table.Cell></Table.Column>
                <Table.Column width={100} verticalAlign={"middle"}><Table.HeaderCell>二步验证</Table.HeaderCell><TableCellEnDis dataKey={'authenticator_status'} /></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>备注</Table.HeaderCell><Table.Cell dataKey={'remarks'} /></Table.Column>
                <Table.Column width={160} verticalAlign={"middle"}><Table.HeaderCell>添加时间</Table.HeaderCell><Table.Cell>
                    {row => datetime(row.created_at)}
                </Table.Cell></Table.Column>
                <Table.Column width={100} verticalAlign={"middle"}><Table.HeaderCell>状态</Table.HeaderCell><TableCellEnDis dataKey={'status'} /></Table.Column>
                <Table.Column width={100} verticalAlign={"middle"}><Table.HeaderCell>操作</Table.HeaderCell>
                    <Table.Cell>
                        {row => <ButtonGroup size={'xs'}>
                            <Button appearance={'primary'} onClick={() => edit(row.id)}>编辑</Button>
                            {row.id > 1 && <TableConformButton color={'red'} description={'确认删除？此操作不可恢复'} onConfirm={() => del(row.id)}>删除</TableConformButton>}
                        </ButtonGroup>}
                    </Table.Cell>
                </Table.Column>
            </TableLayout>
        </div>
    )
}
