import { Dialog, Fab } from "@material-ui/core";
import { Cancel, SettingsBackupRestore } from "@material-ui/icons";
import { selectTrash, removeQuoteFromTrash } from "features/trash/trashSlice";
import { useAppSelector, useAppDispatch } from "hooks";
import { IQuotePrivate } from "interfaces/IQuotePrivate.interface";
import { FC } from "react";
import { QuoteService } from "services/quotes.service";

import "./scss/TrashModal.scss";

interface IProps {
	open: boolean,
	setClose: () => void,
}

export const TrashModal: FC<IProps> = (props: IProps) => {
	const trash = useAppSelector(selectTrash);
	const dispatch = useAppDispatch();

	function closeModal(event: any) {
		event.preventDefault();
		props.setClose();
	}

	const trashList = trash.map((quote: IQuotePrivate) => {
		return (
			<div key={quote.id} className="item">
				<div className="quote">
					<span>
						{quote.text}
					</span>
				</div>

				<Fab aria-label="delete quote" onClick={() => {
					QuoteService.deleteQuote(quote.id);
					dispatch(removeQuoteFromTrash(quote))
				}}>
					<Cancel />
				</Fab>

				<Fab aria-label="validate quote" onClick={() => {
					dispatch(removeQuoteFromTrash(quote))
				}}>
					<SettingsBackupRestore />
				</Fab>

			</div>
		);
	});

	return (
		<div className="new-quote-modal">
			<Dialog
				open={props.open}
				onClose={closeModal}
				aria-labelledby="new-quote-modal-title"
				aria-describedby="new-quote-modal-description"
				disableScrollLock={true}
			>
				<h2>Trash</h2>
				{
					(trash.length > 0 &&
					trashList) ||
					<span id="empty">Empty</span>
				}
			</Dialog>
		</div>
	);
}