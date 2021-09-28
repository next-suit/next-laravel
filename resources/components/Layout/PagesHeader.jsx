import * as React from 'react'
import {Divider, Dropdown, Nav, Navbar} from "rsuite";
import {logger, toastSuccess} from "../../utils/functions";
import api from "../../utils/api";
import ChangePassword from "./ChangePassword";
import {useHistory, useLocation} from 'react-router-dom';
import Envelope from "@rsuite/icons/legacy/Envelope";
import SignOut from "@rsuite/icons/legacy/SignOut";
import UserO from "@rsuite/icons/legacy/UserO";
import Key from "@rsuite/icons/legacy/Key";

export default React.memo(function PagesHeader(props){
    const [user, setUser] = React.useState({});
    const [clearLoading, setClearLoading] = React.useState(false);
    const [passwordOpen, setPasswordOpen] = React.useState(false);
    const [pathname, setPathname] = React.useState(window.location.pathname.replace(/\//g, '_'));
    const history = useHistory();

    React.useEffect(()=> {
        init();
    }, []);

    async function init(){
        let res = await api.get('/index/info');
        setUser(res.user);
    }

    function clear(){
        setClearLoading(true);
        setTimeout(async () => {
            await api.get('/index/clear');
            setClearLoading(false);
            toastSuccess('清除完成');
        }, 2000);
    }

    return (
        <div>
            <Navbar appearance={'inverse'}>
                <Nav pullRight>
                    {/*{location.pathname === '/admin' && <Nav.Item icon={<Icon icon="refresh" spin={clearLoading} />} onClick={() => clear()}>
                        清除缓存
                    </Nav.Item>}*/}
                    {user.id > 0 ?
                        [
                            <Dropdown key={'2'} placement={'bottomEnd'} title={user.name} icon={<UserO />}>
                                <Dropdown.Item
                                    icon={<Envelope />}>{user.email || '未设置邮箱'}</Dropdown.Item>
                                <Dropdown.Item icon={<Key />}
                                               onSelect={() => setPasswordOpen(true)}>更改密码</Dropdown.Item>
                                <Divider style={{margin: '0.5rem 0'}}/>
                                <Dropdown.Item icon={<SignOut />} onSelect={() => {
                                    localStorage.setItem(`auth_jump${pathname}`, location.pathname);
                                    history.push('/login')
                                }}>登出</Dropdown.Item>
                            </Dropdown>,
                            /*<Dropdown key={'1'} placement={'bottomEnd'} icon={<Icon icon={'globe'}/>}>
                                <Dropdown.Item
                                               onSelect={() => GlobalLocale.set('zh-CN')}>简体中文</Dropdown.Item>
                                <Dropdown.Item
                                               onSelect={() => GlobalLocale.set('en')}>English</Dropdown.Item>
                            </Dropdown>*/
                        ]
                        :
                        <Dropdown key={'2'} placement={'bottomEnd'} title={'操作员'} icon={<UserO />}>
                            <Dropdown.Item onSelect={()=> history.push('/login')} className="navbar-brand logo">登录</Dropdown.Item>
                        </Dropdown>
                    }
                </Nav>
            </Navbar>
            <ChangePassword open={passwordOpen} onClose={() => setPasswordOpen(false)} />
        </div>
    );
})
