import { useEffect } from "react"
import { updateUser } from "src/features/user/userSlice";
import { useAppDispatch } from "src/hooks";
import { IUser } from "src/interfaces/IUser.interface";
import { AuthService } from "src/services/auth.service";
import { FooterComponent } from "../Footer/Footer";
import { Menubar } from "../Menubar/Menubar"

import "./scss/Layout.scss";

interface Props {
	children: React.ReactNode,
};

export const Layout = (props: Props) => {
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
			<main>{props.children}</main>
			<FooterComponent />
		</div>
	)
}