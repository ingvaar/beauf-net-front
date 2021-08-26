import { createBrowserHistory } from "history";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from 'app/screens/LoginPage/LoginPage.screen';
import { Homepage } from 'app/screens/homepage/Homepage';
import { Layout } from "app/components/layout/Layout";

export const history = createBrowserHistory({ forceRefresh: false });

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="" component={Homepage} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
