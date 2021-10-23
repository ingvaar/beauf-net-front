import { QuotesList } from "app/components/QuotesList/QuotesList"
import { FC, useState } from "react";

export const QuotesListPage: FC = () => {
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(50);
	const [total, setTotal] = useState<number>(0);

	const handleTotal = (total: number) => {
		setTotal(total);
	}

	return (
		<div id="quotes-list-page" className="column">
			<QuotesList page={page} perPage={perPage} handleTotal={handleTotal} />
			<p>Page: {page}</p>
			<p>Per Page: {perPage}</p>
			<p>Total: {total}</p>
		</div>
	);
};