import { Button } from "@material-ui/core";
import { deleteUser, selectUser } from "features/user/userSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { FC } from "react";
import { useHistory } from "react-router";
import { ButtonDropdown } from "../ButtonDropdown/ButtonDropdown";

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
			<Button className="home" id="home" onClick={() => history.push("/")}>Beauf.net</Button>
		)
	}

	const login = () => {
		if (user.id !== "") {
			return (
				drop()
			);
		}
		return (
			<Button className="login" id="login" onClick={goToLogin}>Login</Button>
		);
	}

	const drop = () => {
		const array = [{
			key: "1",
			name: "Logout",
			callback: handleSignOut
		}]

		return (
			<ButtonDropdown arrayOfData={array} name="Admin" buttonID="admin" />
		);
	}

	return (
		<div id='menubar'>
			{home()}
			{login()}
		</div>
	);
}