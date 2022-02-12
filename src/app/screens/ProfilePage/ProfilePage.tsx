import { Button } from "@material-ui/core";
import { Create, Gavel } from "@material-ui/icons";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Information } from "src/app/components/Information/Information";
import { ProfileEditor } from "src/app/components/ProfileEditor/ProfileEditor";
import { selectUser } from "src/features/user/userSlice";
import { useAppSelector } from "src/hooks";
import { IUser } from "src/interfaces/IUser.interface";
import { UserService } from "src/services/user.service";

import "./scss/profile-page.scss";

export const ProfilePage: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	const history = useNavigate();
	const [edit, setEdit] = useState<boolean>(false);
	const [updated, setUpdated] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const { t } = useTranslation();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (user.username.length === 0) {
			history("");
		} else {
			setLoading(false);
		}
	});

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

	const pageBody = (
		<div>
			{
				updated &&
				<Information class="info" content={
					<span>
						{t('profileUpdated')} !
					</span>
				} />
			}
			{
				!user.confirmed &&
				<Information class="error" content={
					<span>
						<p>{t('emailNotConfirmed')}</p>
						<p>{t('checkMailOrClick')} <button onClick={resendMail}>{t('here')}</button> {t('toResendConfMail')}</p>
					</span>
				} />
			}
			{
				error.length > 0 &&
				<Information class="error" content={
					<span>
						{error}
					</span>
				} />
			}
			<div className="profile">
				{
					user.role === "mod" &&
					<Gavel titleAccess={t('moderator')} id="mod-icon" />
				}
				{
					user.role === "admin" &&
					<Gavel titleAccess={t('administrator')} id="admin-icon" />
				}
				<ProfileEditor edit={edit} setEditOff={setEditOff} setUpdated={() => { setUpdated(true) }} />
				<Button id="button-edit" aria-label="add quote" onClick={() => { setEdit(!edit) }}>
					<Create />
				</Button>
			</div>
		</div>
	)

	return (
		<div id="profile-page" className="column">
			{
				!loading &&
				pageBody
			}
		</div>
	);
};