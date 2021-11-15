import * as React from 'react'
import {Divider, Dropdown, Nav, Navbar} from "rsuite";
import {logger, toastSuccess} from "../../../utils/functions";
import api from "../../../utils/api";
import ChangePassword from "./ChangePassword";
import {useHistory, useLocation} from 'react-router-dom';
import Envelope from "@rsuite/icons/legacy/Envelope";
import SignOut from "@rsuite/icons/legacy/SignOut";
import UserO from "@rsuite/icons/legacy/UserO";
import Key from "@rsuite/icons/legacy/Key";
import {ActiveUrlContext, NavItemsContext} from "./MenuContext";
import ResponsiveNav from "./ResponsiveNav";

const PagesHeader = (props) => {
    const [user, setUser] = React.useState({});
    const [clearLoading, setClearLoading] = React.useState(false);
    const [passwordOpen, setPasswordOpen] = React.useState(false);
    const [navItems, setNavItems] = React.useContext(NavItemsContext);
    const [activeUrl, setActiveUrl] = React.useContext(ActiveUrlContext);
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
                <Navbar.Body className={'flex'}>
                <div className={'flex-1'} style={{width: 1}}>
                    <ResponsiveNav removable={true} activeKey={activeUrl} onItemRemove={eventKey => {
                        const nextItems = [...navItems];
                        const index = nextItems.map(item => item.url).indexOf(eventKey);
                        nextItems.splice(index, 1);
                        setNavItems(nextItems);
                        setActiveUrl(nextItems[index - 1] ? nextItems[index - 1].url : '/index/dashboard');
                    }} onSelect={key => setActiveUrl(key)} moreText={<span>更多</span>} className={'page-header-navitem'}>
                        {navItems.map(item => <ResponsiveNav.Item key={item.url} eventKey={item.url}>{item.name}</ResponsiveNav.Item>)}
                    </ResponsiveNav>
                </div>
                <Nav pullRight={true}>
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
                                    history.push('/login')
                                }}>登出</Dropdown.Item>
                            </Dropdown>
                        ]
                        :
                        <Dropdown key={'2'} placement={'bottomEnd'} title={'操作员'} icon={<UserO />}>
                            <Dropdown.Item onSelect={()=> history.push('/login')} className="navbar-brand logo">登录</Dropdown.Item>
                        </Dropdown>
                    }
                </Nav>
                </Navbar.Body>
            </Navbar>
            <ChangePassword open={passwordOpen} onClose={() => setPasswordOpen(false)} />
        </div>
    );
};

export default React.memo(PagesHeader);
