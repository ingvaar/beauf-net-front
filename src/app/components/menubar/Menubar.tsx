import { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";

import "./scss/Menubar.scss";

export const Menubar: FC = () => {
	const [loggedIn, setLoggedIn] = useState<boolean>(false);
	const history = useHistory();

	useEffect(() => {
		if (window.localStorage.getItem("token")) {
			setLoggedIn(true);
		}
	}, []);

	const handleSignOut = () => {
		window.localStorage.removeItem("token");
		setLoggedIn(false);
	}

	const goToLogin = () => {
		history.push("/login")
	}

	const home = () => {
		return (
			<button className="home" onClick={() => history.push("/")}>Home</button>
		)
	}

	const login = () => {
		if (loggedIn) {
			return (
				<button className="admin" onClick={handleSignOut}>Disconnect</button>
			);
		}
		return (
			<button className="admin" onClick={goToLogin}>Admin</button>
		);
	}

	return (
		<div id='menubar'>
			{home()}
			{login()}
		</div>
	);
}