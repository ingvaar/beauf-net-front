import { UserCreationForm } from "app/components/UserCreationForm/UserCreationForm";
import { FC } from "react";

export const ModRequestPage: FC = () => {
	return (
		<div id="mod-request-page" className="column">
			<UserCreationForm />
		</div>
	);
};