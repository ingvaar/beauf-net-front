import React, { useState } from "react";
import "./scss/LoginPage.scss";

/** COMPONENTS */
import LoginForm from "app/components/LoginForm/LoginForm.component";

/** INTERFACES */
import { ILoginForm } from "interfaces/ILoginForm.interface";

/** REACT ROUTER */
import { useHistory } from "react-router-dom";
import { AuthService } from "services/auth.service";


const LoginPage: React.FC = () => {
	const history = useHistory();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

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
