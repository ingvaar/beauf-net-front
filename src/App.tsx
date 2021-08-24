import { createBrowserHistory } from "history";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from 'app/screens/LoginPage/LoginPage.screen';
import { Homepage } from 'app/screens/homepage/Homepage';
import { Menubar } from 'app/components/menubar/Menubar';

export const history = createBrowserHistory({ forceRefresh: true });

function App() {
  return (
    <div className="App">
      <Menubar />
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="" component={Homepage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
