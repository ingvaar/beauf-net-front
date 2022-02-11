import { Button } from "@material-ui/core";
import { Create, Gavel } from "@material-ui/icons";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import { Information } from "src/app/components/Information/Information";
import { ProfileEditor } from "src/app/components/ProfileEditor/ProfileEditor";
import { selectUser } from "src/features/user/userSlice";
import { useAppSelector } from "src/hooks";
import { IUser } from "src/interfaces/IUser.interface";
import { UserService } from "src/services/user.service";

import "./scss/profile-page.scss";

export const ProfilePage: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	const history = useHistory();
	const [edit, setEdit] = useState<boolean>(false);
	const [updated, setUpdated] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const checkUser = () => {
		if (!(user.role.length > 0 && user.role === 'admin')) {
			history.push("/");
		}
	}

	const setEditOff = () => {
		setEdit(false);
	}

	const resendMail = async () => {
		setError("");
		try {
			await UserService.resendMail()
		} catch (error: any) {
			setError(error.message);
		}
	}

	return (
		<div id="profile-page" className="column">
			{checkUser()}
			{
				updated &&
				<Information class="info" content={
					<span>
						Profile updated !
					</span>
				}/>
			}
			{
				!user.confirmed &&
				<Information class="error" content={
					<span>
						<p>Your email is not confirmed</p>
						<p>Check your mailbox or click <button onClick={resendMail}>here</button> to resend a confirmation email</p>
					</span>
				}/>
			}
			{
				error.length > 0 &&
				<Information class="error" content={
					<span>
						{error}
					</span>
				}/>
			}
			<div className="profile">
				{
					user.role === "mod" &&
					<Gavel titleAccess="Moderator" id="mod-icon"/>
				}
				{
					user.role === "admin" &&
					<Gavel titleAccess="Administrator" id="admin-icon"/>
				}
				<ProfileEditor edit={edit} setEditOff={setEditOff} setUpdated={() => { setUpdated(true) }}/>
				<Button id="button-edit" aria-label="add quote" onClick={() => { setEdit(!edit) }}>
					<Create />
				</Button>
			</div>
		</div>
	);
};