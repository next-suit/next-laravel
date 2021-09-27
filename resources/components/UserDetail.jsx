import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import api from "../utils/api";
import {Avatar, Modal, List, Badge, Button} from "rsuite";

export default React.memo((props) => {
    const [user, setUser] = useState({info: {}});
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        if (props.user_id > 0) {
            init();
        }
    }, [props.user_id]);

    async function init() {
        setLoading(true);
        let res = await api.get('/user/' + props.user_id);
        setUser(res);
        setLoading(false);
    }

    return (
        <Modal
            size={'xs'}
            show={props.show}
            onHide={() => props.setShow(false)}
            overflow={false}
            // animation={false}
            dialogClassName={'animated flipInY fadeIn'}
        >
            <Modal.Header><Modal.Title>用户详情</Modal.Title></Modal.Header>
            <Modal.Body>
                <div className={'py-24 text-center bg-cover bg-center bg-no-repeat relative user-detail-blur'}
                     style={{backgroundImage: user.info.avatar && 'url(' + user.info.avatar + ')'}}>
                </div>
                <div className={'absolute bg-white shadow-lg user-detail-avatar'}>
                    {user.info.avatar && <img src={user.info.avatar} />}
                </div>
                <div className={'mt-16'}>
                    <List>
                        <List.Item>用户名：{user.name}</List.Item>
                        <List.Item>手机号：{user.mobile || <span className={'text-gray-500'}>未绑定</span>}</List.Item>
                        <List.Item>状态：{user.status === 1 ? <span><Badge className={'bg-green-500'}/> 正常</span> :
                            <span><Badge className={'bg-black'}/> 黑名单</span>}</List.Item>
                        <List.Item>性别：{user.info.gender_name}</List.Item>
                        <List.Item>
                            <div className={'flex justify-between'}>
                                <div>积分余额：<span className={'text-orange-500'}>{user.info.integral}</span></div>
                                <div><Button appearance={'primary'} size={'xs'} onClick={()=> history.push('/user/integrals/'+user.id)}>积分记录</Button></div>
                            </div>
                        </List.Item>
                        <List.Item>注册时间：{user.created_at}</List.Item>
                        <List.Item>
                            <div className={'flex justify-between'}>
                                <div>最后登录时间：{user.last_at}</div>
                                <div><Button appearance={'primary'} size={'xs'} onClick={()=> history.push('/user/logins/'+user.id)}>登录记录</Button></div>
                            </div>
                        </List.Item>
                    </List>
                </div>
            </Modal.Body>
        </Modal>
    );
})
