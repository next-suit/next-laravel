import React from 'react';
import {Button, Input, Modal, Table, Toggle} from "rsuite";
import api from "../utils/api";
import {toastSuccess, wait} from "../utils/functions";

export default props => {
    const [list, setList] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        props.show && init();
    }, [props.show]);

    async function init(){
        setLoading(true);
        let res = await api.get('');
        await wait(300);
        setList(res.list);
        setLoading(false);
    }

    async function submit(){
        setLoading(true);
        list.map(async (item) => {
            await api.post('');
        });
        toastSuccess('费率保存完成');
        setLoading(false);
        props.setShow(false);
    }

    return (
        <Modal show={props.show} onHide={() => props.setShow(false)} size={'lg'} overflow={true}>
            <Modal.Header><Modal.Title>通道费率编辑</Modal.Title></Modal.Header>
            <Modal.Body className={'pb-2'}>
                <Table
                    bordered
                    autoHeight
                    wordWrap
                    loading={loading}
                    data={list}
                >
                    <Table.Column width={60} verticalAlign={'middle'}><Table.HeaderCell>ID</Table.HeaderCell><Table.Cell dataKey={'id'}/></Table.Column>
                    <Table.Column width={100} verticalAlign={'middle'}><Table.HeaderCell>开户名</Table.HeaderCell><Table.Cell>
                        {row => row.identity.name}
                    </Table.Cell></Table.Column>
                    <Table.Column flexGrow={1} verticalAlign={'middle'}><Table.HeaderCell>通道名</Table.HeaderCell><Table.Cell>
                        {row => row.channel.name}
                    </Table.Cell></Table.Column>
                    <Table.Column flexGrow={1} verticalAlign={'middle'}><Table.HeaderCell>通道编码</Table.HeaderCell><Table.Cell>
                        {row => row.channel.channel_code}
                    </Table.Cell></Table.Column>
                    <Table.Column width={160} verticalAlign={'middle'}><Table.HeaderCell>通道费率</Table.HeaderCell><Table.Cell>
                        {row => <Input value={row.rate} onChange={value => {
                            let data = Object.assign([], list);
                            data.find(item => item.id === row.id).rate = value;
                            setList(data);
                        }} style={{width: 80}} />}
                    </Table.Cell></Table.Column>
                    <Table.Column width={80} verticalAlign={'middle'}><Table.HeaderCell>通道开关</Table.HeaderCell><Table.Cell>
                        {row => <Toggle checked={!!row.status} onChange={value => {
                            let data = Object.assign([], list);
                            data.find(item => item.id === row.id).status = value ? 1 : 0;
                            setList(data);
                        }} />}
                    </Table.Cell></Table.Column>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button appearance={'primary'} onClick={() => submit()}>保存配置</Button>
            </Modal.Footer>
        </Modal>
    )
}
