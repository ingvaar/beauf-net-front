import { Fab } from "@material-ui/core";
import { FC } from "react";
import { Edit } from "@material-ui/icons";

import "./scss/ButtonAddQuote.scss";

type Props = {
}

export const ButtonAddQuote: FC<Props> = (props: Props) => {
	return (
		<div className="button-add-quote">
			<Fab aria-label="add quote" variant="extended">
				<Edit />
				New quote
			</Fab>
		</div>
	);
}