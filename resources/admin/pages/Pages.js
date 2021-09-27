import React from "react";
import {Route, Redirect, Switch} from "react-router-dom";

const Index = React.lazy(() => import("./Index/Index"));

export default function Pages(props){

    return (
        <div className={'p-4'}>
            <React.Suspense fallback={null}>
                <Route path={'/'} exact={true} strict={true}><Redirect to={'/index'} /></Route>
                <Route path={'/index'}><Index /></Route>
            </React.Suspense>
        </div>
    );
}
