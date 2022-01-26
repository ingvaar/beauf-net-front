import { Fab } from "@material-ui/core";
import { FC } from "react";
import { Edit } from "@material-ui/icons";

import "./scss/ButtonAddQuote.scss";

interface IProps {
	openModal: () => void,
}

export const ButtonAddQuote: FC<IProps> = (props: IProps) => {
	return (
		<div className="button-add-quote">
			<Fab aria-label="add quote" variant="extended" onClick={props.openModal}>
				<Edit />
				New quote
			</Fab>
		</div>
	);
}