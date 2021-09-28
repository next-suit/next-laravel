import {CustomProvider} from "rsuite";
import zhCN from 'rsuite/locales/zh_CN';
import {HashRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";

function App() {
  return (
      <CustomProvider locale={zhCN}>
        <HashRouter>
            <Switch>
                <Route exact={true} strict={true} path={'/login'}><Login /></Route>
                <Route path={'/'}><Layout /></Route>
            </Switch>
        </HashRouter>
      </CustomProvider>
  );
}

export default App;
