import { Button } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

import { deleteUser, selectUser } from "src/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "src/hooks";
import { IUser } from "src/interfaces/IUser.interface";
import { ButtonDropdown } from "../ButtonDropdown/ButtonDropdown";
import { LangSelector } from "../LangSelector/LangSelector";
import { LoginPopup } from "../LoginPopup/LoginPopup";

import "./scss/Menubar.scss";

export const Menubar: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const history = useNavigate();
	const { t } = useTranslation();

	const handleSignOut = () => {
		window.localStorage.removeItem("token");
		dispatch(deleteUser());
		history("/");
	}

	const adminPanel = () => {
		history("admin");
	}

	const userPanel = () => {
		history("profile");
	}

	const home = () => {
		return (
			<Button className="home" id="home" onClick={() => { history("/") }}>Beauf.net</Button>
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
				name: t('profile'),
				callback: userPanel,
			},
		]

		if (user.role.length > 0 && user.role === "admin") {
			array.push({
				key: "2",
				name: t('adminPanel'),
				callback: adminPanel,
			});
		}

		array.push({
			key: "3",
			name: t('logout'),
			callback: handleSignOut,
		})

		return (
			<ButtonDropdown arrayOfData={array} name={user.username[0].toUpperCase() + user.username.substr(1).toLowerCase()} buttonID="drop-button" />
		);
	}

	return (
		<div id='menubar'>
			<div className="logo-lang">
				{home()}
				<LangSelector />
			</div>
			{login()}
		</div>
	);
}