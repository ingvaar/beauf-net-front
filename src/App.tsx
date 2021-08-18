import './App.css';
import { createBrowserHistory } from "history";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import LoginPage from 'app/screens/LoginPage/LoginPage.screen';

export const history = createBrowserHistory({ forceRefresh: true });

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
