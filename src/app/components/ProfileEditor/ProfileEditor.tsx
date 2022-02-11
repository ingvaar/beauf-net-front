import { TextField, Button } from "@material-ui/core";
import { FC, useState, useEffect, FormEvent } from "react";

import { useAppDispatch, useAppSelector } from "src/hooks";
import { selectUser, updateUser } from "src/features/user/userSlice";
import { IUser } from "src/interfaces/IUser.interface";
import { IUserPatch } from "src/interfaces/IUserPatch.interface";
import { UserService } from "src/services/user.service";

import "./scss/profile-editor.scss";

interface IUserProfile extends IUser {
	password: string,
}

interface Props {
	edit: boolean,
	setEditOff: () => void,
	setUpdated: () => void,
}

export const ProfileEditor: FC<Props> = (props: Props) => {
	const user: IUserProfile = Object.assign({
		password: "",
	}, useAppSelector(selectUser));
	const [error, setError] = useState<string>("");
	const [form, setForm] = useState<IUserProfile>(
		user
	);
	const dispatch = useAppDispatch();
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


	// Password check
	useEffect(() => {
		if (passwordCheck.length > 0 && passwordCheck !== form.password) {
			setPasswordCheckError("Password don't match");
		} else if(passwordCheck.length === 0) {
			setPasswordCheckError("Should not be empty");
		} else {
			setPasswordCheckError("")
		}
	}, [passwordCheck, passwordCheckError, form.password]);

	// Email check
	useEffect(() => {
		if (emailCheck.length > 0 && emailCheck !== form.email) {
			setEmailCheckError("Email don't match");
		} else if(emailCheck.length === 0) {
			setEmailCheckError("Should not be empty");
		} else {
			setEmailCheckError("");
		}
	}, [emailCheck, emailCheckError, form.email]);

	// Username validation
	useEffect(() => {
		const usernameRegexp = new RegExp('^\\w+$', 'i')

		if (form.username.length > 0 && (form.username.length < 4 || form.username.length > 24)) {
			setUsernameError("Username should be between 4 and 24 long");
		} else if (form.username.length > 0 && !usernameRegexp.test(form.username)) {
			setUsernameError("Username should only contains letters and numbers");
		} else if (form.username.length === 0) {
			setUsernameError("Should not be empty");
		} else {
			setUsernameError("");
		}
	}, [form.username, usernameError]);

	// Email validation
	useEffect(() => {
		const emailRegexp = new RegExp('^\\S+[@]\\S+[.][a-z]+$', 'i')

		if (form.email.length > 0 && !emailRegexp.test(form.email)) {
			setEmailError("Invalid email");
		} else if (form.email.length === 0) {
			setEmailError("Should not be empty");
		} else {
			setEmailError("");
		}
	}, [form.email, emailError]);

	// Password validation
	useEffect(() => {
		const passwordRegexp = new RegExp('^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[!@#$&\\*_\'\\-"èé`àç()[\\]?]).{0,}$', '')

		if (form.password.length > 0 && (form.password.length < 8 || form.password.length > 32)) {
			setPasswordError("Password should be between 8 and 32 long");
		} else if (form.password.length > 0 && !passwordRegexp.test(form.password)) {
			setPasswordError("Password should contains atleast one special character, one uppercase and one number");
		} else {
			setPasswordError("");
		}
	}, [form.password, passwordError]);

	function handleChange(event: any) {
		setError("");
		setForm({ ...form, [event.target.name]: event.target.value });
		if (event.target.name === "new-password") {
			setForm({ ...form, password: event.target.value});
		}
	};

	const checkFormErrors = () => {
		if (
			passwordError.length > 0 ||
			(form.password.length > 0 &&
			passwordCheckError.length > 0) ||
			emailError.length > 0 ||
			(form.email !== user.email &&
			emailCheckError.length > 0) ||
			usernameError.length > 0
		) {
				throw new Error("Please correct form errors");
			}
		if (form.username.length === 0 ||
			(
				form.email.length !== 0 &&
				emailCheck.length === 0 &&
				form.email !== user.email
			) ||
			(
				form.password.length !== 0 &&
				passwordCheck.length === 0
			)) {
				throw new Error("Please fill all required fields");
			}
	}

	function checkForm(): IUserPatch {
		const finalUser: IUserPatch = Object.assign({}, form);

		if (form.username === user.username) {
			delete(finalUser.username);
		}

		if (form.email === user.email) {
			delete(finalUser.email);
		}

		if (!form.password) {
			delete(finalUser.password);
		}

		return finalUser;
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			checkFormErrors();
			const updatedUser: IUser = await UserService.update(user.id, checkForm());
			dispatch(updateUser(updatedUser));
			props.setEditOff();
			props.setUpdated();
		} catch (error: any) {
			setError(error.message);
			setForm(form);
		}
		setPasswordCheck("");
		setEmailCheck("");
	};

	const userProfileBody = (
		<div className="editor-body">
			<form onSubmit={handleSubmit} className="profile-form">
				<TextField
					label="Username"
					name="username"
					onChange={handleChange}
					value={form.username}
					variant="outlined"
					error={usernameError.length > 0}
					helperText={usernameError}
					disabled={!props.edit}
				/>
				<TextField
					label="Email"
					name="email"
					onChange={handleChange}
					value={form.email}
					variant="outlined"
					error={emailError.length > 0}
					helperText={emailError}
					disabled={!props.edit}
				/>
				<TextField
					label="Confirm email"
					name="confirm-email"
					className={form.email === user.email || form.email.length === 0 || !props.edit ? "hidden" : ""}
					variant="outlined"
					error={(emailCheck.length > 0 && emailCheck !== form.email) || emailCheck.length === 0}
					onChange={(e) => setEmailCheck(e.target.value)}
					value={emailCheck}
					helperText={emailCheckError}
				/>
				<TextField
					label="Password"
					name="new-password"
					type="password"
					onChange={handleChange}
					value={form.password}
					variant="outlined"
					error={passwordError.length > 0}
					helperText={passwordError}
					autoComplete="new-password"
					className={props.edit ? "" : "hidden"}
				/>
				<TextField
					label="Confirm password"
					name="confirm-password"
					className={form.password.length === 0 || !props.edit ? "hidden" : ""}
					type="password"
					variant="outlined"
					error={(passwordCheck.length > 0 && passwordCheck !== form.password) || passwordCheck.length === 0}
					onChange={(e) => setPasswordCheck(e.target.value)}
					value={passwordCheck}
					helperText={passwordCheckError}
				/>
				<div className="update-profile-button">
					<Button className={props.edit ? "" : "hidden"} type="submit">Update Profile</Button>
				</div>
			</form>
			{(error.length > 0 && props.edit) && (
				<div className="error">
					<p>{error}</p>
				</div>
			)}
		</div>
	);

	return (
		<div className="profile-editor">
			{userProfileBody}
		</div>
	);
}