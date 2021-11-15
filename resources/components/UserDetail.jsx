import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from "../utils/api";
import {Avatar, Modal, List, Badge, Button, Nav} from "rsuite";

const UserDetail = ({value, onChange, ...props}) => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [active, setActive] = React.useState('info');
    const [url, setUrl] = React.useState('');
    const history = useHistory();

    useEffect(() => {
        if (value > 0) {
            init();
        }
    }, [value]);

    async function init() {
        setLoading(true);
        let res = await api.get('/user/' + value);
        setUser(res.data);
        setUrl(res.url);
        setLoading(false);
    }

    return (
        <Modal
            // size={'lg'}
            full
            open={!!value}
            onClose={() => onChange(0)}
            onExited={() => setActive('info')}
            overflow={false}
            // animation={false}
            dialogClassName={'animated flipInY fadeIn'}
        >
            <Modal.Header><Modal.Title>用户详情</Modal.Title></Modal.Header>
            <Modal.Body>
                <Nav activeKey={active} appearance={"subtle"} onSelect={setActive}>
                    <Nav.Item eventKey={'info'}>基本信息</Nav.Item>
                    <Nav.Item eventKey={'deposit'}>充值记录</Nav.Item>
                    <Nav.Item eventKey={'withdraw'}>提现记录</Nav.Item>
                    <Nav.Item eventKey={'bet'}>下注记录</Nav.Item>
                    <Nav.Item eventKey={'tree'}>推广下级列表</Nav.Item>
                    <Nav.Item eventKey={'transaction'}>流水记录</Nav.Item>
                    <Nav.Item eventKey={'login'}>登录记录</Nav.Item>
                </Nav>
                {active === 'info' && <div>
                    <List>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>用户ID：</div><div>{user.id}</div></List.Item>
                        <List.Item className={'flex items-center'}>
                            <div className={'font-bold w-32'}>头像：</div>
                            <div>{<Avatar src={user.avatar} size={"lg"} circle={true} />}</div>
                        </List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>用户名：</div><div>{user.name}</div></List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>手机号：</div><div>{user.mobile || <span className={'text-gray-300'}>未绑定</span>}</div></List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>邮箱：</div><div>{user.email || <span className={'text-gray-300'}>未绑定</span>}</div></List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>状态：</div><div>{user.status === 1 ? <span><Badge style={{backgroundColor: 'springgreen'}}/> 启用</span> :
                            <span><Badge style={{backgroundColor: 'red'}}/> 禁用</span>}</div></List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>性别：</div><div>{user.gender === 2 ? <span className={'text-pink-500'}>女</span> : user.gender === 1 ? <span className={'text-blue-500'}>男</span> : <span className={'text-gray-500'}>保密</span>}</div></List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>推广链接：</div><div>{url}/invite/{user.code}</div></List.Item>
                        <List.Item className={'flex items-center'}>
                            <div className={'font-bold w-32'}>钱包余额：</div>
                            <div className={'flex items-center'}>
                                <div className={'text-orange-500'}>{user.cash || '0.00'}</div>
                                <Button appearance={'primary'} className={'ml-2'} size={'xs'} onClick={()=> setActive('transaction')}>流水记录</Button>
                            </div>
                        </List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>上级用户名：</div><div>{user.parent?.name || <span className={'text-gray-300'}>[顶级用户]</span>}</div></List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>上级用户手机号：</div><div>{user.parent?.mobile || <span className={'text-gray-300'}>[顶级用户]</span>}</div></List.Item>
                        <List.Item className={'flex'}><div className={'font-bold w-32'}>注册时间：</div><div>{user.created_at}</div></List.Item>
                        <List.Item className={'flex items-center'}>
                            <div className={'font-bold w-32'}>最后登录：</div>
                            <div className={'flex items-center'}>
                                <div className={'text-orange-500'}>{user.last_login ? <span>{user.last_login.created_at} {user.last_login.geo_location}</span>  : '暂无记录'}</div>
                                <Button appearance={'primary'} className={'ml-2'} size={'xs'} onClick={()=> setActive('login')}>登录记录</Button>
                            </div>
                        </List.Item>
                    </List>
                </div>}
            </Modal.Body>
        </Modal>
    );
};

export default React.memo(UserDetail);
