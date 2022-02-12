import { CircularProgress } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { UserService } from "src/services/user.service";

import './scss/email-confirmation.scss';

export const EmailConfirmation: FC = () => {
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const search = useLocation().search;
	const { t } = useTranslation();

	useEffect(() => {
		setLoading(true);
		const token = new URLSearchParams(search).get('token');
		if (token === null) {
			setError(t('invalidLink'));
			setLoading(false);
			return;
		}
		UserService.confirm(token).then(() => {
			setError("");
			setLoading(false);
		}).catch((error: any) => {
			setError(error.message);
			setLoading(false);
		})
	}, [search, t]);

	if (loading) {
		return (
			<div className="confirmation loader">
				<CircularProgress />
			</div>
		);
	}

	if (error.length > 0) {
		return (
			<div className="confirmation denied">
				<h2 id="failed">{t('emailConfirmationFailed')}</h2>
				<span id="error">{error}</span>
			</div>
		);
	}

	return (
		<div className="confirmation confirmed">
			<h2 id="ok">{t('emailConfirmationOk')}</h2>
		</div>
	);
};