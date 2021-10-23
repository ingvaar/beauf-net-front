import { Pagination } from "app/components/Pagination/Pagination";
import { QuotesList } from "app/components/QuotesList/QuotesList"
import { FC, useState } from "react";

export const QuotesListPage: FC = () => {
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(1);
	const [total, setTotal] = useState<number>(0);

	return (
		<div id="quotes-list-page" className="column">
			<QuotesList page={page} perPage={perPage} setTotal={setTotal} />
			<Pagination total={total} page={page} perPage={perPage} setPage={setPage} />
			<p>Per Page: {perPage}</p>
		</div>
	);
};