import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import Config from "./Config/Config"

export default function System(props){
    const match = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${match.path}/config`}><Config /></Route>
            </Switch>
        </>
    );
}
