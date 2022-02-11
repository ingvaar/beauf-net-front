import { Fab } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { selectTrash } from "src/features/trash/trashSlice";
import { useAppSelector } from "src/hooks";
import { FC } from "react";

import "./scss/ButtonTrash.scss";

interface IProps {
	openModal: () => void,
}

export const ButtonTrash: FC<IProps> = (props: IProps) => {
	const trash = useAppSelector(selectTrash);

	return (
		<div className="button-trash">
			<Fab aria-label="open trash" onClick={props.openModal}>
				<Delete />
			</Fab>
			{
				trash.length > 0 &&
				<span className="trash-count">
					{trash.length}
				</span>
			}
		</div>
	);
}