import {HashRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";

function App() {
  return (
    <HashRouter>
        <Switch>
            <Route exact={true} strict={true} path={'/login'}><Login /></Route>
            <Route path={'/'}><Layout /></Route>
        </Switch>
    </HashRouter>
  );
}

export default App;
