import React, { useState } from "react";
import LoginForm from "app/components/LoginForm/LoginForm.component";
import { ILoginForm } from "interfaces/ILoginForm.interface";
import { useHistory } from "react-router-dom";
import { AuthService } from "services/auth.service";
import { useAppDispatch } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { updateUser } from "features/user/userSlice";

import "./scss/LoginPage.scss";

const LoginPage: React.FC = () => {
	const history = useHistory();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	let dispatch = useAppDispatch();

	const displayHeader = () => {
		return (
			<div className="header">
				<h2>Admin Login</h2>
			</div>
		);
	};

	const handleSubmit = async (
		registerForm: ILoginForm
	): Promise<void> => {
		try {
			setLoading(true);
			await AuthService.login(registerForm);
			AuthService
				.isLogged()
				.then((res: boolean | IUser) => {
					if (res !== false) {
						dispatch(updateUser(res))
					}
				}).catch((error) => {
					throw error;
				});
			history.push("/");
		} catch (error) {
			setError(error.message);
			setLoading(false);
		}
	};

	if (loading) {
		return (
			<div className="loader">
				<h5>loading...</h5>
			</div>
		);
	}

	if (window.localStorage.getItem("token")) {
		history.push('/');
	}

	return (
		<div id="login-page" className="column">
			{displayHeader()}

			<LoginForm
				method="login"
				parentError={error}
				callback={handleSubmit}
			/>
		</div>
	);
};

export default LoginPage;
