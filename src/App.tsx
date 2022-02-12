import {
  BrowserRouter as Router,
  Route,
  Outlet,
  Routes,
  Navigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Homepage } from 'src/app/screens/Homepage/Homepage';
import { Layout } from "src/app/components/Layout/Layout";
import { AdminPage } from "src/app/screens/AdminPage/Admin.screen";
import { ModRequestPage } from "src/app/screens/ModRequestPage/ModRequestPage";
import { ConfirmPage } from "src/app/screens/ConfirmPage/Confirm.screen";
import { ProfilePage } from "src/app/screens/ProfilePage/ProfilePage";
import { PathLanguage } from "src/app/components/PathLanguage/PathLanguage";
import { AuthLayout } from "./app/components/AuthLayout/AuthLayout";

function App() {
	const { i18n } = useTranslation();

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path=":lang" element={<PathLanguage><Layout><Outlet /></Layout></PathLanguage>}>
            <Route index element={<Homepage />} />
            <Route element={<AuthLayout><Outlet /></AuthLayout>}>
              <Route path="admin" element={<AdminPage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="mod-request" element={<ModRequestPage />} />
          </Route>
          <Route path="confirm" element={<Layout><ConfirmPage /></Layout>} />
          <Route path="*" element={<Navigate to={`${i18n.language}`} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
