import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import Index from "./Index";

const User = (props) => {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact={true} path={`${match.path}`}><Index /></Route>
        </Switch>
    )
}

export default User;
