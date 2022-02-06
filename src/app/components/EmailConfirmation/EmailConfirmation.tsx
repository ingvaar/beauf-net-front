import { CircularProgress } from "@material-ui/core";
import { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserService } from "services/user.service";

import './scss/email-confirmation.scss';

export const EmailConfirmation: FC = () => {
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);
	const search = useLocation().search;

	useEffect(() => {
		setLoading(true);
		const token = new URLSearchParams(search).get('token');
		if (token === null) {
			setError("Invalid link");
			setLoading(false);
			return;
		}
		UserService.Confirm(token).then(() => {
			setError("");
			setLoading(false);
		}).catch((error: any) => {
			setError(error.message);
			setLoading(false);
		})
	}, [search]);

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
				<h2 id="failed">Validation failed</h2>
				<span id="error">{error}</span>
			</div>
		);
	}

	return (
		<div className="confirmation confirmed">
			<h2 id="ok">Email confirmed</h2>
		</div>
	);
};