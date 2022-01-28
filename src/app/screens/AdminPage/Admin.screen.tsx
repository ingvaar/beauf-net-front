import { AdminQuotesList } from "app/components/AdminQuotesList/AdminQuotesList";
import { ButtonTrash } from "app/components/ButtonTrash/ButtonTrash";
import { Pagination } from "app/components/Pagination/Pagination";
import { PerPage } from "app/components/PerPage/PerPage";
import { TrashModal } from "app/components/TrashModal/TrashModal";
import { FC, useState } from "react";

import "./scss/Admin.scss";

export const AdminPage: FC = () => {
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);
	const [trashModalOpen, setTrashModalOpen] = useState<boolean>(false);

	const setTrashModalClose = () => {
		setTrashModalOpen(false);
	}

	const openModal = () => {
		setTrashModalOpen(true);
	}

	return (
		<div id="admin-page" className="column">
			<ButtonTrash openModal={openModal} />
			<PerPage perPage={perPage} setPerPage={setPerPage} />
			<AdminQuotesList page={page} perPage={perPage} setTotal={setTotal} />
			<Pagination total={total} page={page} perPage={perPage} setPage={setPage} />
			<TrashModal open={trashModalOpen} setClose={setTrashModalClose} />
		</div>
	);
};