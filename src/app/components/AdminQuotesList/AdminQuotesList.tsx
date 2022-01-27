import { CircularProgress, Fab } from "@material-ui/core";
import { Cancel, CheckCircleOutline } from "@material-ui/icons";
import { IQuotePrivate } from "interfaces/IQuotePrivate.interface";
import { IQuotesPrivate } from "interfaces/IQuotesPrivate.interface";
import { FC, useEffect, useState } from "react";
import { QuoteService } from "services/quotes.service";

interface IProps {
	page: number,
	perPage: number
	setTotal: (total: number) => void
}

export const AdminQuotesList: FC<IProps> = (props: IProps) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [quotes, setQuotes] = useState<IQuotesPrivate>();

	useEffect(() => {
		setLoading(true);
		QuoteService.getUnvalidatedQuotes(props.perPage, props.page).then((res: IQuotesPrivate) => {
			setQuotes(res);
			props.setTotal(res.total);
			setLoading(false);
		}).catch((err: any) => {
			setError(err.message);
			setLoading(false);
		});
	}, [props, props.page, props.perPage]);

	const elements = quotes?.data.map((quote: IQuotePrivate) => {
		return (
			<div key={quote.id} className="item">
				<div className="quote">
					<span>
						{quote.text}
					</span>
				</div>

				<div className="flex footer">
					<div className="source">
						<span>
							{quote.source ? (
								quote.source
							) : (
								"Unknown"
							)}
						</span>
					</div>

					<div className="author">
						<span>
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
					QuoteService.deleteQuote(quote.id);
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