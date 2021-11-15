import React from "react";
import {Button, DatePicker, DateRangePicker, Table, Form, Input, Panel, Whisper, Popover} from "rsuite";
import {logger} from "../../../utils/functions";
import api from "../../../utils/api";
import TableLayout from "../../../components/Table/TableLayout";
import Plus from "@rsuite/icons/Plus";
import Search from "@rsuite/icons/Search";
import Avatar from "../../../components/Avatar";
import UploadImage from "../../../components/UploadImage";
import UploadImages from "../../../components/UploadImages";
import {Area, TinyArea} from "@ant-design/charts";
import InfoOutline from "@rsuite/icons/InfoOutline";

export default function Dashboard(props) {
    const [date, setDate] = React.useState(null);
    const [dates, setDates] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState({});
    const [list, setList] = React.useState({});
    const [image, setImage] = React.useState('');

    React.useEffect(() => {
        setFilterValue({images: ['https://shijuepi.com/uploads/allimg/201221/1-201221111036-50.jpg']});
        init();
    }, []);

    async function init(){

    }

    async function submit() {
        let res = await api.get('/index/dashboard22', {params: {date, dates}});
        setList(res.list);
    }
    const data = [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
    ];
    return <div>
        <div className={'flex justify-between items-center'}>
            <Panel bodyFill={true} bordered={true} className={'w-1/4 rounded-none shadow-sm py-2'}>
                <div className={'flex justify-between px-4'}><div className={'text-gray-500'}>总销售额</div><div>
                    <Whisper trigger={'hover'} placement={'bottomEnd'} speaker={<Popover title={'数据说明'}><p>数据分为总数据和今日数据</p><p>图标走势为每日数据报表(含今天)</p></Popover>}>
                        <InfoOutline className={'cursor-pointer'} />
                    </Whisper>
                </div></div>
                <div className={'text-2xl font-bold py-2 px-4'}>{(23244.23).toLocaleString()}</div>
                <TinyArea
                    style={{height: 50}}
                    color={'#EF7A64'}
                    line={{color: '#EF7A64'}}
                    data={data.map(item => item.value)}
                />
                <hr className={'my-2 mx-4'} />
                <div className={'px-4'}>今日销售额 {(1234.56).toLocaleString()}</div>
            </Panel>
        </div>
        <div className={'py-4'} />
        <div><DateRangePicker value={dates} onChange={value => setDates(value)}/></div>
        <div><DatePicker value={date} onChange={setDate}/></div>
        <div><Button onClick={submit}>Submit</Button></div>
        <div>
            <Form layout={"inline"} formValue={filterValue} onChange={(value) => {
                setFilterValue(value);
                logger(value);
            }}>
                <Form.Group>
                    <Form.ControlLabel>姓名</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'name'} autoComplete={'off'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>姓名2</Form.ControlLabel>
                    <Form.Control accepter={Input} name={'name2'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>上传图片</Form.ControlLabel>
                    <Form.Control accepter={UploadImage} name={'image'} />
                </Form.Group>
                <Form.Group>
                    <Form.ControlLabel>上传多个图片</Form.ControlLabel>
                    <Form.Control accepter={UploadImages} name={'images'} />
                </Form.Group>
                <Form.Group>
                    <Button type={'submit'} appearance={'primary'}><Search /> 搜索</Button>
                </Form.Group>
            </Form>
        </div>
        <div>
            <Avatar src={'https://shijuepi.com/uploads/allimg/201221/1-201221111036-50.jpg'} />
        </div>
        <div>

        </div>
        <Form layout={"inline"}>
            <Button appearance={'primary'} color={'blue'}><Plus /> <span>添加</span></Button>
        </Form>
        <div>
            <TableLayout data={list} onChange={() => submit()}>
                <Table.Column verticalAlign={"middle"}><Table.HeaderCell>ROW1</Table.HeaderCell><Table.Cell dataKey={'id'}/></Table.Column>
            </TableLayout>
        </div>
    </div>;
}
