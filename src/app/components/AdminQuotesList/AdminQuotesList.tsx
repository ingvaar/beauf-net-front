import { CircularProgress, Fab } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";
import { addQuoteToTrash, selectTrash } from "src/features/trash/trashSlice";
import { useAppSelector, useAppDispatch } from "src/hooks";
import { IQuotePrivate } from "src/interfaces/IQuotePrivate.interface";
import { IQuotesPrivatePage } from "src/interfaces/IQuotesPrivatePage.interface";
import { FC, useEffect, useState, useMemo } from "react";
import { QuoteService } from "src/services/quotes.service";

import "./scss/AdminQuotesList.scss";
import { useTranslation } from "react-i18next";

interface IProps {
	page: number,
	perPage: number
	setTotal: (total: number) => void
}

export const AdminQuotesList: FC<IProps> = (props: IProps) => {
	const trash = useAppSelector(selectTrash);
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [quotes, setQuotes] = useState<IQuotesPrivatePage>();
	const { t } = useTranslation();

	const quotesDisplay = useMemo<Array<IQuotePrivate>>(() => {
		if (quotes === undefined) {
			return [];
		}
		return quotes?.data.filter((quote) => {
			return !trash.some((trashQuote: IQuotePrivate) => {
				return (quote.id === trashQuote.id);
			});
		});
	}, [trash, quotes]);

	useEffect(() => {
		setLoading(true);
		QuoteService.getUnvalidatedQuotes(props.perPage, props.page).then((res: IQuotesPrivatePage) => {
			setQuotes(res);
			props.setTotal(res.total);
			setLoading(false);
		}).catch((err: any) => {
			setError(err.message);
			setLoading(false);
		});
	}, [props, props.page, props.perPage]);

	const validateQuote = (id: string) => {
		if (quotes !== undefined) {
			const tempQuotes = Object.assign(quotesDisplay);
			tempQuotes.data = quotes.data.filter((q) => {
				return !(id === q.id)
			});
			tempQuotes.total -= 1;
			setQuotes(tempQuotes);
			QuoteService.validateQuote(id);
		}
	};

	const elements = quotesDisplay.map((quote: IQuotePrivate) => {
		return (
			<div key={quote.id} className="item">
				<div className="quote">
					<span>
						{quote.text}
					</span>
				</div>

				<div className="flex footer">
					<div className="source-author column">
						<span>
							{t('source') + ": "}
							{quote.source ? (
								quote.source
							) : (
								t('unknown')
							)}
						</span>

						<span>
							{t('author') + ": "}
							{quote.author ? (
								quote.author
							) : (
								t('unknown')
							)}
						</span>
					</div>

					<div className="date column">
						<span>{quote.createdAt.split('T')[0]}</span>
						<span>{quote.createdAt.split('T')[1].substr(0, 8)}</span>
					</div>
				</div>

				<div className="buttons">
					<Fab aria-label="delete" className="delete admin-button" onClick={() => {
						dispatch(addQuoteToTrash(quote));
					}}>
						<Close />
					</Fab>

					<Fab aria-label="validate" className="validate admin-button" onClick={() => {
						validateQuote(quote.id);
					}}>
						<Check />
					</Fab>
				</div>
			</div>
		);
	});

	if (loading) {
		return (
			<div className="quotes-list loader">
				<CircularProgress />
			</div>
		);
	}

	if (error.length > 0) {
		return (
			<div className="quotes-list error">
				<p>{error}</p>
			</div>
		);
	}
	return (
		<div className="admin-quotes-list">
			<div className="list column">
				{elements}
			</div>
		</div>
	);
}