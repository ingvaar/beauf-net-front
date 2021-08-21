import React, { useState } from "react";
import "./scss/LoginPage.scss";

/** COMPONENTS */
import LoginForm from "app/components/LoginForm/LoginForm.component";

/** INTERFACES */
import { ILoginForm } from "interfaces/ILoginForm.interface";

/** REACT ROUTER */
import { useHistory } from "react-router-dom";


const LoginPage: React.FC = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const displayHeader = () => {
		return (
			<div className="header">
				<h1>Login page Header</h1>
			</div>
		);
	};

	const handleSubmit = async (
		registerForm: ILoginForm
	): Promise<void> => {
		try {
			setLoading(true);
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
