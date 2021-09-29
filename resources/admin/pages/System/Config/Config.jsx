import React from 'react'
import {Route, Redirect, Switch, useRouteMatch} from 'react-router-dom'
import Index from "./Index"
import Edit from "./Edit"

export default function Config(props){
    const match = useRouteMatch();

    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`}><Index /></Route>
                <Route path={`${match.path}/:id/edit`}><Edit /></Route>
            </Switch>
        </>
    );
}
