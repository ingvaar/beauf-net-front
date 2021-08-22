import React, { useEffect, useState } from "react";

import { ILoginForm } from "interfaces/ILoginForm.interface";
import { DefaultLoginForm } from "./constants/DefaultLoginForm.constant";
import { AuthService } from "services/auth.service";

import "./scss/LoginForm.scss";

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
	const [error, setError] = useState<string>("");
	const [form, setForm] = useState<ILoginForm>(
		DefaultLoginForm
	);

	useEffect(() => {
		setError(parentError);
	}, [parentError])

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

	async function handleSubmit() {
		try {
			AuthService.isValidLoginRegisterForm(form);
			callback(form);
		} catch (error) {
			setError(error.message);
			setForm({ identifier: form.identifier, password: "" });
		}
	};

	return (
		<div id="login-component" className="column">
			{displayHeader()}
			<form>
				<input
					placeholder="Identifier"
					value={form.identifier}
					name="identifier"
					onChange={handleChange}
				/>
				<input
					placeholder="Password"
					value={form.password}
					type='password'
					name="password"
					onChange={handleChange}
				/>
			</form>
			<div className="submit-button">
				<button type="submit" onClick={handleSubmit}>Login</button>
			</div>
			{error.length > 0 && (
				<div className="error">
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};

export default LoginForm;
