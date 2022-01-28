import { Button } from "@material-ui/core";
import { deleteUser, selectUser } from "features/user/userSlice";
import { useAppDispatch, useAppSelector } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { FC } from "react";
import { useHistory } from "react-router";
import { ButtonDropdown } from "../ButtonDropdown/ButtonDropdown";
import { LoginPopup } from "../LoginPopup/LoginPopup";

import "./scss/Menubar.scss";

export const Menubar: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const history = useHistory();

	const handleSignOut = () => {
		window.localStorage.removeItem("token");
		dispatch(deleteUser());
		history.push("/");
	}

	const adminPanel = () => {
		history.push("/admin");
	}

	const userPanel = () => {
		// TODO
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
			<div id="login">
				<LoginPopup />
			</div>
		);
	}

	const drop = () => {
		const array = [
			{
				key: "1",
				name: "Profile",
				callback: userPanel,
			},
		]

		if (user.role.length > 0 && user.role === "admin") {
			array.push({
				key: "2",
				name: "Admin Panel",
				callback: adminPanel,
			});
		}

		array.push({
			key: "3",
			name: "Logout",
			callback: handleSignOut,
		})

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