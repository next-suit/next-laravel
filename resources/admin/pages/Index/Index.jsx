import React from "react";
import {useRouteMatch, Route, Switch, Redirect} from "react-router-dom";
import Dashboard from "./Dashboard";

export default function Index(props){
    const match = useRouteMatch();

    return <Switch>
        <Route exact={true} path={`${match.path}`}><Redirect to={`${match.path}/dashboard`} /></Route>
        <Route exact={true} path={`${match.path}/dashboard`}><Dashboard /></Route>
    </Switch>
}
