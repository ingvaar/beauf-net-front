import { FC, useEffect, useState } from "react";

import "./scss/Pagination.scss";

type Props = {
	total: number
	page: number,
	perPage: number,
	setPage: (page: number) => void,
}

export const Pagination: FC<Props> = (props) => {
	const [totalPages, setTotalPages] = useState<number>(0);

	useEffect(() => {
		setTotalPages(Math.ceil(props.total / props.perPage));
	}, [props.page, props.perPage, props.total]);

	const handlePagination = (page: number) => {
		props.setPage(page);
	};

	return (
		<div className="pagination">
			<div className="pagination-wrapper">
				{props.page !== 1 && (
					<button
						onClick={() => handlePagination(props.page - 1)}
						type="button"
						className="page-item side"
					>&lt;</button>
				)}

				<button
					onClick={() => handlePagination(1)}
					type="button"
					className={props.page === 1 ? "page-item active" : "page-item"}
				>
					{1}
				</button>

				{props.page > 3 && (<div className="separator">...</div>)}

				{props.page > 2 && (
					<button
						onClick={() => handlePagination(props.page - 1)}
						type="button"
						className="page-item"
					>
						{props.page - 1}
					</button>
				)}

				{props.page !== 1 && props.page !== totalPages && (
					<button
						onClick={() => handlePagination(props.page)}
						type="button"
						className="page-item active"
					>
						{props.page}
					</button>
				)}

				{props.page < totalPages - 1 && (
					<button
						onClick={() => handlePagination(props.page + 1)}
						type="button"
						className="page-item"
					>
						{props.page + 1}
					</button>
				)}

				{props.page < totalPages - 2 && (<div className="separator">...</div>)}

				{totalPages !== 1 && (
					<button
						onClick={() => handlePagination(totalPages)}
						type="button"
						className={props.page === totalPages ? "page-item active" : "page-item"}
					>
						{totalPages}
					</button>
				)}

				{props.page !== totalPages && (
					<button
						onClick={() => handlePagination(props.page + 1)}
						type="button"
						className="page-item side"
					>
						&gt;
					</button>
				)}
			</div>
		</div>
	);
};