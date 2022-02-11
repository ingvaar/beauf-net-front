import { createBrowserHistory } from "history";
import {
  Router,
  Switch,
  Route,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Homepage } from 'src/app/screens/Homepage/Homepage';
import { Layout } from "src/app/components/Layout/Layout";
import { AdminPage } from "src/app/screens/AdminPage/Admin.screen";
import { ModRequestPage } from "src/app/screens/ModRequestPage/ModRequestPage";
import { ConfirmPage } from "src/app/screens/ConfirmPage/Confirm.screen";
import { ProfilePage } from "src/app/screens/ProfilePage/ProfilePage";
import { availableLanguages } from "src/i18n";

export const history = createBrowserHistory({ forceRefresh: false });

function App() {
  const { i18n } = useTranslation();

  return (
    <div className="App">
      <select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
        {availableLanguages.map((language) => (
          <option key={language}>{language}</option>
        ))}
      </select>
      <Router history={history}>
        <Layout>
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/admin" component={AdminPage} />
            <Route exact path="/mod-request" component={ModRequestPage} />
            <Route exact path="/confirm" component={ConfirmPage} />
            <Route exact path="/profile" component={ProfilePage} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
