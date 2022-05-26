import { Fab, TextField, Button } from "@material-ui/core";
import { KeyboardReturn } from "@material-ui/icons";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { FC, useState, useRef, FormEvent, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { INewUserForm } from "src/interfaces/INewUserForm.interface";
import { UserService } from "src/services/user.service";
import { CDefaultNewUserForm } from "./constants/DefaultUserCreationForm.constant";

import "./scss/UserCreationForm.scss";

export const UserCreationForm: FC = () => {
	const history = useNavigate();
	const [error, setError] = useState<string>("");
	const [form, setForm] = useState<INewUserForm>(
		CDefaultNewUserForm
	);
	const [posted, setPosted] = useState<boolean>(false);
	const { t } = useTranslation();

	// Password check
	const [passwordCheckError, setPasswordCheckError] = useState<string>("");
	const [passwordCheck, setPasswordCheck] = useState<string>("");
	// Email check
	const [emailCheckError, setEmailCheckError] = useState<string>("");
	const [emailCheck, setEmailCheck] = useState<string>("");
	// Form errors
	const [emailError, setEmailError] = useState<string>("");
	const [usernameError, setUsernameError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	// Password check
	useEffect(() => {
		if (passwordCheck.length > 0 && passwordCheck !== form.password) {
			setPasswordCheckError(t('passwordDontMatch'));
		} else {
			setPasswordCheckError("")
		}
	}, [passwordCheck, passwordCheckError, form.password, t]);

	// Password check error
	useEffect(() => {
		if (emailCheck.length > 0 && emailCheck !== form.email) {
			setEmailCheckError(t('emailDontMatch'));
		} else {
			setEmailCheckError("");
		}
	}, [emailCheck, emailCheckError, form.email, t]);

	// Username validation
	useEffect(() => {
		const usernameRegexp = new RegExp('^\\w+$', 'i')

		if (form.username.length > 0 && (form.username.length < 4 || form.username.length > 24)) {
			setUsernameError(t('usernameLength'));
		} else if (form.username.length > 0 && !usernameRegexp.test(form.username)) {
			setUsernameError(t('usernameFormat'));
		} else {
			setUsernameError("");
		}
	}, [form.username, t, usernameError]);

	// Email validation
	useEffect(() => {
		const emailRegexp = new RegExp('^\\S+[@]\\S+[.][a-z]+$', 'i')

		if (form.email.length > 0 && !emailRegexp.test(form.email)) {
			setEmailError(t('invalidEmail'));
		} else {
			setEmailError("");
		}
	}, [form.email, emailError, t]);

	// Password validation
	useEffect(() => {
		const passwordRegexp = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$&\\*_\'\\-"èé`àç()[\\]?]).{0,}$', '')

		if (form.password.length > 0 && (form.password.length < 8 || form.password.length > 32)) {
			setPasswordError(t('passwordLength'));
		} else if (form.password.length > 0 && !passwordRegexp.test(form.password)) {
			setPasswordError(t('passwordFormat'));
		} else {
			setPasswordError("");
		}
	}, [form.password, passwordError, t]);

	function handleChange(event: any) {
		setError("");
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const checkFormErrors = () => {
		if (passwordCheckError.length > 0 ||
			emailCheckError.length > 0 ||
			usernameError.length > 0 ||
			emailError.length > 0 ||
			passwordError.length > 0) {
			throw new Error(t('correctFormErrors'));
		}
		if (form.username.length === 0 ||
			form.password.length === 0 ||
			form.email.length === 0 ||
			passwordCheck.length === 0 ||
			emailCheck.length === 0) {
			throw new Error(t('fillAllFields'));
		}
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			checkFormErrors();
			const captchaToken = await recaptchaRef?.current?.executeAsync();
			recaptchaRef?.current?.reset();

			form.captcha = captchaToken as string;
			await UserService.add(form);
			setPosted(true);
		} catch (error: any) {
			setError(error.message);
			setForm(form);
		}
	};

	const submittedUserBody = (
		<div className="submitted-user-body">
			<h2 id="submitted-user-title">{t('thanksForSubmitting')} !</h2>
			<div className="return-home">
				<Fab aria-label="home" variant="extended" onClick={() => { history("/") }}>
					<KeyboardReturn />
					{t('home')}
				</Fab>
			</div>
		</div>
	);

	const userCreationFormBody = (
		<div className="form-body">
			<h2 id="new-user-form-title">{t('pleaseProvidInfo')}</h2>
			<form onSubmit={handleSubmit} className="new-user-form">
				<TextField
					label={t('username')}
					name="username"
					onChange={handleChange}
					value={form.username}
					variant="outlined"
					error={usernameError.length > 0}
					helperText={usernameError}
					autoComplete="new-username"
				/>
				<TextField
					label={t('email')}
					name="email"
					onChange={handleChange}
					value={form.email}
					variant="outlined"
					error={emailError.length > 0}
					helperText={emailError}
				/>
				<TextField
					label={t('confirmEmail')}
					name="confirm-email"
					variant="outlined"
					error={emailCheck.length > 0 && emailCheck !== form.email}
					onChange={(e) => setEmailCheck(e.target.value)}
					value={emailCheck}
					helperText={emailCheckError}
				/>
				<TextField
					label={t('password')}
					name="password"
					type="password"
					onChange={handleChange}
					value={form.password}
					variant="outlined"
					error={passwordError.length > 0}
					helperText={passwordError}
					autoComplete="new-password"
				/>
				<TextField
					label={t('confirmPassword')}
					name="confirm-password"
					type="password"
					variant="outlined"
					error={passwordCheck.length > 0 && passwordCheck !== form.password}
					onChange={(e) => setPasswordCheck(e.target.value)}
					value={passwordCheck}
					helperText={passwordCheckError}
				/>
				<ReCAPTCHA
					ref={recaptchaRef}
					size="invisible"
					sitekey="6Lf_NSYeAAAAAMy7_aqunGGn_T4tgjfZ-DuoAYlp"
				/>
				<div className="new-user-submit-button">
					<Button type="submit">{t('submit')}</Button>
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