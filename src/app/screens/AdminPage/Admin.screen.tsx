import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AdminQuotesList } from "src/app/components/AdminQuotesList/AdminQuotesList";
import { ButtonTrash } from "src/app/components/ButtonTrash/ButtonTrash";
import { Pagination } from "src/app/components/Pagination/Pagination";
import { PerPage } from "src/app/components/PerPage/PerPage";
import { TrashModal } from "src/app/components/TrashModal/TrashModal";
import { selectUser } from "src/features/user/userSlice";
import { useAppSelector } from "src/hooks";
import { IUser } from "src/interfaces/IUser.interface";

import "./scss/Admin.scss";

export const AdminPage: FC = () => {
	const user: IUser = useAppSelector(selectUser);
	const history = useNavigate();
	const [page, setPage] = useState<number>(1);
	const [perPage, setPerPage] = useState<number>(10);
	const [total, setTotal] = useState<number>(0);
	const [trashModalOpen, setTrashModalOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!(user && user.role.length > 0 && (user.role === 'admin' || user.role === 'mod'))) {
			history("/");
		} else {
			setLoading(false);
		}
	}, [user, history]);

	const setTrashModalClose = () => {
		setTrashModalOpen(false);
	}

	const openModal = () => {
		setTrashModalOpen(true);
	}

	const pageBody = (
		<div>
			<ButtonTrash openModal={openModal} />
			<PerPage perPage={perPage} setPerPage={setPerPage} />
			<AdminQuotesList page={page} perPage={perPage} setTotal={setTotal} />
			<Pagination total={total} page={page} perPage={perPage} setPage={setPage} />
			<TrashModal open={trashModalOpen} setClose={setTrashModalClose} />
		</div>
	)

	return (
		<div id="admin-page" className="column">
			{
				!loading &&
				pageBody
			}
		</div>
	);
};