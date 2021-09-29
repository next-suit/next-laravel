import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import Group from "./Group/Group"
import User from "./User/User"

export default function Permission(props){
    const match = useRouteMatch();

    return (
        <>
            <Switch>
                <Route path={`${match.path}/group`}><Group /></Route>
                <Route path={`${match.path}/user`}><User /></Route>
            </Switch>
        </>
    );
}
