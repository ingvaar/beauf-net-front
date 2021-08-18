import React, { useState } from "react";
import { useHistory } from "react-router";

import { ILoginForm } from "interfaces/ILoginForm.interface";
import { DefaultLoginForm } from "./constants/DefaultLoginForm.constant";

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
	const [form, setForm] = useState<ILoginForm>(
		DefaultLoginForm
	);

	function displayHeader() {
		return (
			<div className="header">
				<h3>Login</h3>
			</div>
		);
	};

	function handleChange(event: any) {
		setError("");
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	async function handleSubmit(): Promise<void> {
	};

	return (
		<div id="register-page" className="column">
			{displayHeader()}
			<form onSubmit={handleSubmit}>
				<input
					placeholder="Identifier"
					value={form.identifier}
					name="identifier"
					onChange={handleChange}
				/>
				<input
					placeholder="Password"
					value={form.password}
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
