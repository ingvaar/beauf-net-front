import { FC } from "react";

import { UserCreationForm } from "src/app/components/UserCreationForm/UserCreationForm";

export const ModRequestPage: FC = () => {
	return (
		<div id="mod-request-page" className="column">
			<UserCreationForm />
		</div>
	);
};