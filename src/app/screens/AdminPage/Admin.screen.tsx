import { AdminQuotesList } from "app/components/AdminQuotesList/AdminQuotesList";
import { Pagination } from "app/components/Pagination/Pagination";
import { PerPage } from "app/components/PerPage/PerPage";
import { FC, useState } from "react";

export const AdminPage: FC = () => {
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);

	return (
		<div id="admin-page" className="column">
			<PerPage perPage={perPage} setPerPage={setPerPage} />
			<AdminQuotesList page={page} perPage={perPage} setTotal={setTotal} />
			<Pagination total={total} page={page} perPage={perPage} setPage={setPage} />
		</div>
	);
};