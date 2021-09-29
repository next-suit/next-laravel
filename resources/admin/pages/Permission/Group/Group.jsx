import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import Edit from "./Edit"
import Index from "./Index";

export default function Group(props){
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
