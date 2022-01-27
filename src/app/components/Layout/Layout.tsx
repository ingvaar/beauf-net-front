import { updateUser } from "features/user/userSlice";
import { useAppDispatch } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { FC, useEffect } from "react"
import { AuthService } from "services/auth.service";
import { Menubar } from "../Menubar/Menubar"

export const Layout: FC = ({ children }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		AuthService
			.isLogged()
			.then((res: boolean | IUser) => {
				if (res !== false) {
					dispatch(updateUser(res))
				}
			})
	}, [dispatch]);

	return (
		<div id='layout' className='column'>
			<Menubar />
			<main>{children}</main>
			<footer />
		</div>
	)
}