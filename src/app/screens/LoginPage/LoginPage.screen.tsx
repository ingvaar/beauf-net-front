import { FC, useState } from "react";
import LoginForm from "app/components/LoginForm/LoginForm.component";
import { ILoginForm } from "interfaces/ILoginForm.interface";
import { useHistory } from "react-router-dom";
import { AuthService } from "services/auth.service";
import { useAppDispatch } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { updateUser } from "features/user/userSlice";
import { CircularProgress } from "@material-ui/core";

import "./scss/LoginPage.scss";

const LoginPage: FC = () => {
	const history = useHistory();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const dispatch = useAppDispatch();

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
		} catch (error: any) {
			setError(error.message);
			setLoading(false);
		}
	};

	if (window.localStorage.getItem("token")) {
		history.push('/');
	}

	return (
		<div id="login-page" className="column">
			<LoginForm
				method="login"
				parentError={error}
				callback={handleSubmit}
			/>
			{
				loading &&
				<div className="loader">
					<CircularProgress />
				</div>
			}
		</div>
	);
};

export default LoginPage;
