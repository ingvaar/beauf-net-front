import { Fab, TextField, Button } from "@material-ui/core";
import { KeyboardReturn } from "@material-ui/icons";
import { INewUserForm } from "interfaces/INewUserForm.interface";
import { FC, useState, useRef, FormEvent } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useHistory } from "react-router-dom";
import { CDefaultNewUserForm } from "./constants/DefaultUserCreationForm.constant";

import "./scss/UserCreationForm.scss";

export const UserCreationForm: FC = () => {
	const history = useHistory();
	const [error, setError] = useState<string>("");
	const [form, setForm] = useState<INewUserForm>(
		CDefaultNewUserForm
	);
	const [posted, setPosted] = useState<boolean>(false);

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	function handleChange(event: any) {
		setError("");
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const captchaToken = await recaptchaRef?.current?.executeAsync();
			recaptchaRef?.current?.reset();

			form.captcha = captchaToken as string;
			// TODO: call service
			setPosted(true);
		} catch (error: any) {
			setError(error.message);
			setForm(form);
		}
	};

	const checkEmail = (event: any) => {
		if (event.target.value.length > 0 && event.target.value !== form.email) {
			setError("Email dont match");
		} else {
			setError("");
		}
	}

	const checkPassword = (event: any) => {
		if (event.target.value.length > 0 && event.target.value !== form.password) {
			setError("Password dont match");
		} else {
			setError("");
		}
	}

	const submittedUserBody = (
			<div className="submitted-user-body">
				<h2 id="submitted-user-title">Thanks for submitting !</h2>
				<div className="return-home">
					<Fab aria-label="home" variant="extended" onClick={() => {history.push("/")}}>
						<KeyboardReturn />
						Home
					</Fab>
				</div>
			</div>
	);

	const userCreationFormBody = (
		<div>
			<h2 id="new-user-form-title">Please provide some information</h2>
			<form onSubmit={handleSubmit} className="new-user-form">
				<TextField
					id="standard"
					label="Username"
					name="username"
					onChange={handleChange}
					value={form.username}
					variant="outlined"
				/>
				<TextField
					id="standard"
					label="Email"
					name="email"
					onChange={handleChange}
					value={form.email}
					variant="outlined"
				/>
				<TextField
					id="standard"
					label="Confirm email"
					name="confirm-email"
					variant="outlined"
					onChange={checkEmail}
				/>
				<TextField
					id="standard"
					label="Password"
					name="password"
					type="password"
					onChange={handleChange}
					value={form.password}
					variant="outlined"
				/>
				<TextField
					id="standard"
					label="Confirm password"
					name="confirm-password"
					type="password"
					variant="outlined"
					onChange={checkPassword}
				/>
				<ReCAPTCHA
					ref={recaptchaRef}
					size="invisible"
					sitekey="6Lf_NSYeAAAAAMy7_aqunGGn_T4tgjfZ-DuoAYlp"
				/>
				<div className="new-user-submit-button">
					<Button type="submit">Submit</Button>
				</div>
			</form>
			{error.length > 0 && (
				<div className="error">
					<p>{error}</p>
				</div>
			)}
		</div>
	);

	return (
		<div className="user-creation">
			{posted === false ? userCreationFormBody : submittedUserBody}
		</div>
	);
}