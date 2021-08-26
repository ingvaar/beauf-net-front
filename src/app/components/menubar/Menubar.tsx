import { deleteUser, selectUser } from "features/user/userSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { FC } from "react";
import { useHistory } from "react-router";

import "./scss/Menubar.scss";

export const Menubar: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	let dispatch = useAppDispatch();
	const history = useHistory();

	const handleSignOut = () => {
		window.localStorage.removeItem("token");
		dispatch(deleteUser());
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
		if (user.id !== "") {
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