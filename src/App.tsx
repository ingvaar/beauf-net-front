import { createBrowserHistory } from "history";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import { Homepage } from 'app/screens/Homepage/Homepage';
import { Layout } from "app/components/Layout/Layout";
import { AdminPage } from "app/screens/AdminPage/Admin.screen";

export const history = createBrowserHistory({ forceRefresh: false });

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/admin" component={AdminPage} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
