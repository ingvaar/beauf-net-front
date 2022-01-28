import { CircularProgress, Fab } from "@material-ui/core";
import { Cancel, CheckCircleOutline } from "@material-ui/icons";
import { addQuoteToTrash, selectTrash } from "features/trash/trashSlice";
import { useAppSelector, useAppDispatch } from "hooks";
import { IQuotePrivate } from "interfaces/IQuotePrivate.interface";
import { IQuotesPrivatePage } from "interfaces/IQuotesPrivatePage.interface";
import { FC, useEffect, useState, useMemo } from "react";
import { QuoteService } from "services/quotes.service";

import "./scss/AdminQuotesList.scss";

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
							{"Source: "}
							{quote.source ? (
								quote.source
							) : (
								"Unknown"
							)}
						</span>

						<span>
							{"Author: "}
							{quote.author ? (
								quote.author
							) : (
								"Unknown"
							)}
						</span>
					</div>

					<div className="date column">
						<span>{quote.createdAt.split('T')[0]}</span>
						<span>{quote.createdAt.split('T')[1].substr(0, 8)}</span>
					</div>
				</div>

				<Fab aria-label="delete quote" onClick={() => {
					dispatch(addQuoteToTrash(quote));
				}}>
					<Cancel />
				</Fab>

				<Fab aria-label="validate quote" onClick={() => {
					QuoteService.validateQuote(quote.id);
				}}>
					<CheckCircleOutline />
				</Fab>

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