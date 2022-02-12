import { Dialog, Fab } from "@material-ui/core";
import { Close, DeleteForever, SettingsBackupRestore } from "@material-ui/icons";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { selectTrash, removeQuoteFromTrash } from "src/features/trash/trashSlice";
import { useAppSelector, useAppDispatch } from "src/hooks";
import { IQuotePrivate } from "src/interfaces/IQuotePrivate.interface";
import { QuoteService } from "src/services/quotes.service";

import "./scss/TrashModal.scss";

interface IProps {
	open: boolean,
	setClose: () => void,
}

export const TrashModal: FC<IProps> = (props: IProps) => {
	const trash = useAppSelector(selectTrash);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();

	function closeModal(event: any) {
		event.preventDefault();
		props.setClose();
	}

	const emptyTrash = () => {
		trash.map((quote) => {
			QuoteService.deleteQuote(quote.id);
			dispatch(removeQuoteFromTrash(quote))
			return trash
		})
	}

	const trashList = trash.map((quote: IQuotePrivate) => {
		return (
			<div key={quote.id} className="item">
				<div className="quote">
					<span>
						{quote.text}
					</span>
				</div>

				<div className="buttons">
					<Fab aria-label="delete" className="delete admin-button" onClick={() => {
						QuoteService.deleteQuote(quote.id);
						dispatch(removeQuoteFromTrash(quote))
					}}>
						<Close />
					</Fab>

					<Fab aria-label="restore" className="restore admin-button" onClick={() => {
						dispatch(removeQuoteFromTrash(quote))
					}}>
						<SettingsBackupRestore />
					</Fab>
				</div>
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
				<h2 id="trash-modal-title">{t('trash')}</h2>
				{
					trash.length > 1 &&
					<Fab aria-label="empty" className="empty" onClick={() => {
						emptyTrash();
					}}>
						<DeleteForever />
					</Fab>
				}
				{
					(trash.length > 0 &&
					trashList) ||
					<span id="empty">{t('empty')}</span>
				}
			</Dialog>
		</div>
	);
}