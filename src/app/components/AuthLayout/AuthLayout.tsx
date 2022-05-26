import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { updateUser } from "src/features/user/userSlice";
import { useAppDispatch } from "src/hooks";
import { IUser } from "src/interfaces/IUser.interface";
import { AuthService } from "src/services/auth.service";

interface Props {
	children: React.ReactNode,
};

export const AuthLayout = (props: Props) => {
	const dispatch = useAppDispatch();
	const [fetchedUser, setFetchedUser] = useState<boolean>(false);
	const history = useNavigate();

	useEffect(() => {
		AuthService
			.isLogged()
			.then((res: boolean | IUser) => {
				if (res !== false) {
					dispatch(updateUser(res))
					setFetchedUser(true);
				} else {
					history("/");
				}
			})
	}, [dispatch, history]);

	return (
		<div id='auth-layout'>
			{
				fetchedUser &&
				props.children
			}
		</div>
	)
}