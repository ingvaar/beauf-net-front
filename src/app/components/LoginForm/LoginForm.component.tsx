import React, { useState } from "react";
import { useHistory } from "react-router";

/** INTERFACES */
import { ILoginForm } from "interfaces/ILoginForm.interface";

interface IProps {
	method: string;
	parentError: string;
	callback: (form: ILoginForm) => void;
}

const LoginForm: React.FC<IProps> = ({
	method,
	parentError,
	callback,
}) => {
	let history = useHistory();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	function displayHeader() {
		return (
			<div className="header">
				<h3>Login</h3>
			</div>
		);
	};

	function handleChange(event: any) {
		setError("");
	};

	async function handleSubmit(): Promise<void> {
	};

	return (
		<div id="register-page" className="column">
			{displayHeader()}
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Identifier"
					value=""
					name="identifier"
					onChange={handleChange}
				/>
				<input
					placeholder="Password"
					value=""
					name="password"
					onChange={handleChange}
				/>
			</form>
			<div className="submit-button">
				<button type="submit">Login</button>
			</div>
		</div>
	);
};

export default LoginForm;
