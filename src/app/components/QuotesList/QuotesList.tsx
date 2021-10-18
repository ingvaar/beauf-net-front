import { CircularProgress } from "@material-ui/core";
import { IQuotesPublic } from "interfaces/IQuotesPublics.interface";
import { FC, useEffect, useState } from "react";
import { QuoteService } from "services/quotes.service";

import "./scss/QuotesList.scss";

type Props = {
	page: number,
	perPage: number
}

export const QuotesList: FC<Props> = (prop) => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [quotes, setQuotes] = useState<IQuotesPublic>();

	useEffect(() => {
		setLoading(true);
		QuoteService.getQuotes(prop.perPage, prop.page).then((res: IQuotesPublic) => {
			setQuotes(res);
			setLoading(false);
		}).catch((err) => {
			setError(err.message);
			setLoading(false);
		});
	}, [prop.page, prop.perPage]);

	const elements = quotes?.data.map((quote) => {
		return (
			<div id={quote.id} className="item">
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

					<div className="date column">
						<span>{quote.createdAt.split('T')[0]}</span>
						<span>{quote.createdAt.split('T')[1].substr(0, 8)}</span>
					</div>
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
		<div className="quotes-list">
			<div className="list column">
				{elements}
			</div>
			<p>Page: {quotes?.page}</p>
			<p>Per Page: {quotes?.perPage}</p>
			<p>Total: {quotes?.total}</p>
		</div>
	);
};