import React, {useEffect, useState, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import {
    ButtonGroup,
    Button,
    Panel,
    Table,
    Form,
    Schema,
    Whisper,
    Popover,
    Input
} from "rsuite";
import {datetime, toast} from "../../../../utils/functions";
import api from "../../../../utils/api";
import TableLayout from "../../../../components/Table/TableLayout";
import TableConformButton from "../../../../components/Table/TableConformButton";
import Plus from "@rsuite/icons/Plus";
import Search from "@rsuite/icons/Search";

export default function Index(props){
    const [list, setList] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const [filterValues, setFilterValues] = React.useState({key: ''});
    const history  = useHistory();

    React.useEffect(() => {
        init()
    }, []);

    async function init() {
        setLoading(true);
        let res = await api.get('/system/config', {params: filterValues});
        setList(res);
        setLoading(false)
    }

    async function edit(id){
        history.push(`/system/config/${id}/edit`);
    }

    async function del(id) {
        let res = await api.delete('/system/config/' + id);
        toast('删除完成', 'success');
        await init();
    }

    return (
        <div>
            <Form layout={'inline'}
                  model={Schema.Model({
                      key: Schema.Types.StringType(),
                  })}
                  onChange={setFilterValues}
                  formValue={filterValues}
                  onSubmit={async (e) => {
                      // e.preventDefault();
                      $PAGE = 1;
                      await init();
                  }}
            >
                <Form.Group>
                    <Form.ControlLabel>配置键名</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'key'} autoComplete={'off'}/>
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
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>配置键名</Table.HeaderCell><Table.Cell dataKey={'key'}/></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>配置值类型</Table.HeaderCell><Table.Cell dataKey={'type_name'}/></Table.Column>
                <Table.Column flexGrow={1} verticalAlign={"middle"}><Table.HeaderCell>配置值</Table.HeaderCell><Table.Cell dataKey={'value'}>
                    {row => row.type === 'onoff' ?
                        (row.value === '1' ? <span className={'text-green-500'}>开启</span> : <span className={'text-red-500'}>关闭</span>)
                        :
                        row.value
                    }
                </Table.Cell></Table.Column>
                <Table.Column flexGrow={2} verticalAlign={"middle"}><Table.HeaderCell>提示信息</Table.HeaderCell><Table.Cell dataKey={'tips'}/></Table.Column>
                <Table.Column width={100} verticalAlign={"middle"}><Table.HeaderCell>操作</Table.HeaderCell>
                    <Table.Cell>
                        {row => <ButtonGroup size={'xs'}>
                            <Button appearance={'primary'} onClick={() => edit(row.id)}>编辑</Button>
                            <TableConformButton color={'red'} description={'确认删除？此数据不可恢复'} onConfirm={() => del(row.id)}>删除</TableConformButton>
                        </ButtonGroup>}
                    </Table.Cell>
                </Table.Column>
            </TableLayout>
        </div>
    )
}
