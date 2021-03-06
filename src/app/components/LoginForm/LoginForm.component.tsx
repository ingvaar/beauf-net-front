import { FC, useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";

import { ILoginForm } from "src/interfaces/ILoginForm.interface";
import { CDefaultLoginForm } from "./constants/DefaultLoginForm.constant";
import { AuthService } from "src/services/auth.service";

import "./scss/LoginForm.scss";
import { useTranslation } from "react-i18next";

interface IProps {
	method: string;
	parentError: string;
	callback: (form: ILoginForm) => void;
}

const LoginForm: FC<IProps> = ({
	method,
	parentError,
	callback,
}) => {
	const [error, setError] = useState<string>("");
	const [form, setForm] = useState<ILoginForm>(
		CDefaultLoginForm
	);
	const { t } = useTranslation();

	useEffect(() => {
		setError(parentError);
	}, [parentError])

	function handleChange(event: any) {
		setError("");
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	async function handleSubmit(event: any) {
		event.preventDefault();
		try {
			AuthService.isValidLoginRegisterForm(form);
			callback(form);
		} catch (error: any) {
			setError(error.message);
			setForm({ identifier: form.identifier, password: "" });
		}
	};

	return (
		<div id="login-component" className="column">
			<form onSubmit={handleSubmit}>
				<TextField
					id="standard"
					label={t('identifier')}
					name="identifier"
					type="email"
					onChange={handleChange}
					value={form.identifier}
				/>
				<TextField
					id="standard-password-input"
					label={t('password')}
					type="password"
					name="password"
					autoComplete="current-password"
					onChange={handleChange}
					value={form.password}
				/>
				<div className="submit-button">
					<Button type="submit" onClick={handleSubmit}>{t('signIn')}</Button>
				</div>
			</form>
			{error.length > 0 && (
				<div className="error">
					<p>{error}</p>
				</div>
			)}
		</div>
	);
};

export default LoginForm;
