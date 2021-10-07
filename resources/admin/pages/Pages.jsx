import React from "react";
import {Route, Redirect, Switch} from "react-router-dom";

const Index = React.lazy(() => import("./Index"));
const Permission = React.lazy(() => import("./Permission/Permission"));
const System = React.lazy(() => import("./System/System"));

export default function Pages(props){

    return (
        <div className={'p-4'}>
            <React.Suspense fallback={null}>
                <Route path={'/'} exact={true} strict={true}><Redirect to={'/index'} /></Route>
                <Route path={'/index'}><Index /></Route>
                <Route path={'/system'}><System /></Route>
                <Route path={'/permission'}><Permission /></Route>
            </React.Suspense>
        </div>
    );
}
