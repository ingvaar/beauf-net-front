
import { EmailConfirmation } from "app/components/EmailConfirmation/EmailConfirmation";
import { FC } from "react";

export const ConfirmPage: FC = () => {
	return (
		<div className="confirmation">
			<EmailConfirmation />
		</div>
	);
};
