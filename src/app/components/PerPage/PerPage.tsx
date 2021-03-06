import { FormControl, NativeSelect } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import "./scss/PerPage.scss";

interface IProps {
	perPage: number,
	setPerPage: (perPage: number) => void
}

export const PerPage: FC<IProps> = (props: IProps) => {
	const { t } = useTranslation();

	const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
		if (event.target.name === "perPage") {
			props.setPerPage(event.target.value as number);
		}
	};

	return (
		<div className="per-page">
			<span className="helper">{t('quotesPerPage')} :</span>
			<FormControl className="form-control">
				<NativeSelect
					className="select"
					value={props.perPage}
					name="perPage"
					onChange={handleChange}
					inputProps={{ 'aria-label': 'perPage' }}
				>
					<option value={10}>10</option>
					<option value={25}>25</option>
					<option value={50}>50</option>
				</NativeSelect>
			</FormControl>
		</div>
	);
}