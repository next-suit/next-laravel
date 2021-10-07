import React from "react";
import {Container, Content, Header, Footer} from "rsuite";
import PagesSidenav from "../../components/Layout/PagesSidenav";
import PagesHeader from "../../components/Layout/PagesHeader";
import PagesFooter from "../../components/Layout/PagesFooter";
import Pages from "./Pages";


export default function Layout(props){
    const [expanded, setExpanded] = React.useState(true);

    return <Container>
        <PagesSidenav expanded={expanded} setExpanded={setExpanded} />
        <Container>
            <Header className={'sticky top-0 z-10'}>
                <PagesHeader />
            </Header>
            <Content>
                <div className={'h-full'}>
                    <Pages />
                </div>
            </Content>
        </Container>
        <Footer>
            <PagesFooter />
        </Footer>
    </Container>
}
