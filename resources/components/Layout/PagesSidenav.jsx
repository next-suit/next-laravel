import * as React from 'react'
import {Sidenav, Dropdown, Nav, Navbar, Sidebar} from "rsuite";
import {useHistory, useLocation} from 'react-router-dom'
import api from "../../utils/api";
import Slack from "@rsuite/icons/legacy/Slack";
import AngleLeft from "@rsuite/icons/legacy/AngleLeft";
import AngleRight from "@rsuite/icons/legacy/AngleRight";
import Bars from "@rsuite/icons/legacy/Bars";
import {logger} from "../../utils/functions";

export default function PagesSidenav(props){
    const [menus, setMenus] = React.useState([]);
    const [siteName, setSiteName] = React.useState('');
    const [openKeys, setOpenKeys] = React.useState([]);
    const location = useLocation();
    const history = useHistory();

    const {expanded, setExpanded} = props;

    React.useEffect(() => {
        init();
    }, []);

    React.useEffect(() => {
        updateAction();
    }, [location.pathname, menus]);

    async function init(){
        let res = await api.get('/index/menus');
        let res2 = await api.get('/index/info');
        setMenus(res);
        setSiteName(res2.site_name);
    }

    function updateAction(){
        for(let i in menus){
            for(let j in menus[i].children){
                if(location.pathname === menus[i].children[j].url){
                    setOpenKeys([menus[i].name]);
                    return;
                }
            }
        }
    }

    return (
        <Sidebar
            width={expanded ? 260 : 56}
            className={'flex flex-col h-screen sticky top-0'}
            collapsible
        >
            <Sidenav.Header appearance={'inverse'}>
                <Navbar appearance={"inverse"} className={'w-full overflow-hidden'}>
                    <Nav>
                        <Nav.Item as={'span'}><Slack /></Nav.Item>
                        <Nav.Item as={'span'}>{siteName} 总后台管理</Nav.Item>
                    </Nav>
                </Navbar>
            </Sidenav.Header>
            <Sidenav
                appearance={'default'}
                expanded={expanded}
                openKeys={openKeys}
                onOpenChange={(keys, e) => setOpenKeys(keys)}
                className={'flex-1 '+(expanded ? ' overflow-y-auto' : '')}
            >
                <Sidenav.Body>
                    <Nav
                        activeKey={location.pathname}
                        onSelect={(key, e)=> {
                            // 还原分页配置
                            $PAGE = 1;
                            $ROWS = $ROWS_DEFAULT;
                            history.push(key);
                        }}
                    >
                        {menus.map((item) => (
                            item.children.length > 0 ? <Dropdown
                                key={item.name}
                                className={'menu-dropdown'}
                                eventKey={item.name}
                                placement="rightStart"
                                title={<div className={'truncate'}>{item.name}</div>}
                                trigger={'hover'}
                                icon={<Bars />}
                            >
                                {item.children.map(sub => (
                                    <Dropdown.Item
                                        key={sub.url}
                                        eventKey={sub.url}
                                        name={sub.name}
                                    >{sub.name}</Dropdown.Item>
                                ))}
                            </Dropdown>
                                :
                                <Nav.Item key={item.url} eventKey={item.url} name={item.name} icon={<Bars />}>{item.name}</Nav.Item>
                        ))}
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
            <NavToggle expanded={expanded} onChange={() => setExpanded(!expanded)} />
        </Sidebar>
    );
}

const NavToggle = ({ expanded, onChange }) => {
    const iconStyles = {
        width: 56,
        height: 56,
        lineHeight: '56px',
        textAlign: 'center'
    };
    return (
        <Navbar appearance="default" className="nav-toggle">
            <Nav pullRight>
                <Nav.Item onClick={onChange} style={{ width: 56, textAlign: 'center' }}>
                    {expanded ? <AngleLeft /> : <AngleRight />}
                </Nav.Item>
            </Nav>
        </Navbar>
    );
};
