import { CircularProgress, Fab } from "@material-ui/core";
import { Block } from "@material-ui/icons";
import { FC, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { selectUser } from "src/features/user/userSlice";
import { useAppSelector } from "src/hooks";
import { IQuotePublic } from "src/interfaces/IQuotePublic.interface";
import { IQuotesPublic } from "src/interfaces/IQuotesPublic.interface";
import { IUser } from "src/interfaces/IUser.interface";
import { QuoteService } from "src/services/quotes.service";

import "./scss/QuotesList.scss";

interface IProps {
	page: number,
	perPage: number
	setTotal: (total: number) => void
}

export const QuotesList: FC<IProps> = (props: IProps) => {
	const user: IUser = useAppSelector(selectUser);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string>("");
	const [quotes, setQuotes] = useState<IQuotesPublic>();
	const { t } = useTranslation();

	const quotesDisplay = useMemo<Array<IQuotePublic>>(() => {
		if (quotes === undefined) {
			return [];
		}
		return quotes.data;
	}, [quotes]);

	useEffect(() => {
		setLoading(true);
		QuoteService.getQuotes(props.perPage, props.page).then((res: IQuotesPublic) => {
			setQuotes(res);
			props.setTotal(res.total);
			setLoading(false);
		}).catch((err: any) => {
			setError(err.message);
			setLoading(false);
		});
	}, [props, props.page, props.perPage]);

	const unvalidateQuote = (id: string) => {
		if (quotes !== undefined) {
			const tempQuotes = Object.assign(quotesDisplay);
			tempQuotes.data = quotes.data.filter((q) => {
				return !(id === q.id)
			});
			tempQuotes.total -= 1;
			setQuotes(tempQuotes);
			QuoteService.unvalidateQuote(id);
		}
	}

	const elements = quotesDisplay.map((quote) => {
		return (
			<div key={quote.id} className="item">
				<div className="quote">
					<span>
						{quote.text}
					</span>
					{ user.role !== "user" && user.role.length > 0 &&
						<Fab aria-label="unvalidate" className="unvalidate" onClick={() => {
							unvalidateQuote(quote.id);
						}}>
							<Block />
						</Fab>
					}
				</div>

				<div className="flex footer">
					<div className="source">
						<span>
							{quote.source ? (
								quote.source
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
		</div>
	);
};