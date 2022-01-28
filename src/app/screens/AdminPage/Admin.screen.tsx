import { AdminQuotesList } from "app/components/AdminQuotesList/AdminQuotesList";
import { ButtonTrash } from "app/components/ButtonTrash/ButtonTrash";
import { Pagination } from "app/components/Pagination/Pagination";
import { PerPage } from "app/components/PerPage/PerPage";
import { TrashModal } from "app/components/TrashModal/TrashModal";
import { selectUser } from "features/user/userSlice";
import { useAppSelector } from "hooks";
import { IUser } from "interfaces/IUser.interface";
import { FC, useState } from "react";
import { useHistory } from "react-router-dom";

import "./scss/Admin.scss";

export const AdminPage: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	const history = useHistory();
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

	const checkUser = () => {
		if (!(user.role.length > 0 && user.role === 'admin')) {
			history.push("/");
		}
	}

	return (
		<div id="admin-page" className="column">
			{checkUser()}
			<ButtonTrash openModal={openModal} />
			<PerPage perPage={perPage} setPerPage={setPerPage} />
			<AdminQuotesList page={page} perPage={perPage} setTotal={setTotal} />
			<Pagination total={total} page={page} perPage={perPage} setPage={setPage} />
			<TrashModal open={trashModalOpen} setClose={setTrashModalClose} />
		</div>
	);
};