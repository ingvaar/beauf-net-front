import { Button } from "@material-ui/core";
import { Create } from "@material-ui/icons";
import { ProfileEditor } from "app/components/ProfileEditor/ProfileEditor";
import { selectUser } from "features/user/userSlice";
import { useAppSelector } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import "./scss/profile-page.scss";

export const ProfilePage: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	const history = useHistory();
	const [edit, setEdit] = useState<boolean>(false);

	const checkUser = () => {
		if (!(user.role.length > 0 && user.role === 'admin')) {
			history.push("/");
		}
	}

	return (
		<div id="profile-page" className="column">
			{checkUser()}
			<div className="row">
				<ProfileEditor edit={edit}/>
				<Button id="button-edit" aria-label="add quote" onClick={() => { setEdit(!edit) }}>
					<Create />
				</Button>
			</div>
		</div>
	);
};