import { createBrowserHistory } from "history";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import { Homepage } from 'app/screens/Homepage/Homepage';
import { Layout } from "app/components/Layout/Layout";
import { AdminPage } from "app/screens/AdminPage/Admin.screen";
import { ModRequestPage } from "app/screens/ModRequestPage/ModRequestPage";

export const history = createBrowserHistory({ forceRefresh: false });

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/mod-request" component={ModRequestPage} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
