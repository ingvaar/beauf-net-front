import { FC } from "react";

import { EmailConfirmation } from "src/app/components/EmailConfirmation/EmailConfirmation";

export const ConfirmPage: FC = () => {
	return (
		<div className="confirmation">
			<EmailConfirmation />
		</div>
	);
};
