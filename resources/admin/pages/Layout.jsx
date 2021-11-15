import React from "react";
import {Container, Content, Header, Footer} from "rsuite";
import PagesSidenav from "../components/Layout/PagesSidenav";
import PagesHeader from "../components/Layout/PagesHeader";
import PagesFooter from "../components/Layout/PagesFooter";
import {ActiveUrlContext, NavItemsContext} from "../components/Layout/MenuContext";


export default function Layout(props) {
    const [expanded, setExpanded] = React.useState(true);
    const [navItems, setNavItems] = React.useState([{url: '/index/dashboard', name: '数据报表'}]);
    const [activeUrl, setActiveUrl] = React.useState('/index/dashboard');

    return (
        <NavItemsContext.Provider value={[navItems, setNavItems]}>
        <ActiveUrlContext.Provider value={[activeUrl, setActiveUrl]}>
            <Container>
                <PagesSidenav expanded={expanded} setExpanded={setExpanded}/>
                <Container>
                    <Header className={'sticky top-0 z-10'}>
                        <PagesHeader/>
                    </Header>
                    <Content>
                        <div className={'h-full'}>
                            {/*这里是iframe循环，对应tabs*/}
                            {navItems.map(item =>
                                <iframe key={item.url} src={window.location.pathname+'#'+item.url} width={'100%'} height={'100%'} style={{display: item.url !== activeUrl ? 'none' : 'block', height: 'calc(100vh - 56px)', width: '100%'}} frameBorder={0} />
                            )}
                        </div>
                    </Content>
                </Container>
                <Footer>
                    <PagesFooter/>
                </Footer>
            </Container>
        </ActiveUrlContext.Provider>
        </NavItemsContext.Provider>
    )
}
