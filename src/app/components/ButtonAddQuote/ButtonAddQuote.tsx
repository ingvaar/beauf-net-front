import { Fab } from "@material-ui/core";
import { FC } from "react";
import { Edit } from "@material-ui/icons";

import "./scss/ButtonAddQuote.scss";
import { useTranslation } from "react-i18next";

interface IProps {
	openModal: () => void,
}

export const ButtonAddQuote: FC<IProps> = (props: IProps) => {
	const { t } = useTranslation();

	return (
		<div className="button-add-quote">
			<Fab aria-label="add quote" variant="extended" onClick={props.openModal}>
				<Edit />
				{t('newQuote')}
			</Fab>
		</div>
	);
}