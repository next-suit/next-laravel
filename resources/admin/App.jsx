import {CustomProvider} from "rsuite";
import zhCN from 'rsuite/locales/zh_CN';
import {HashRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Pages from "./pages/Pages";

function App() {
  return (
      <CustomProvider locale={zhCN}>
        <HashRouter>
            <Switch>
                <Route exact={true} strict={true} path={'/login'}><Login /></Route>
                {window.self === window.top && <Route path={'/'}><Layout /></Route>}
                <Pages />
            </Switch>
        </HashRouter>
      </CustomProvider>
  );
}

export default App;
