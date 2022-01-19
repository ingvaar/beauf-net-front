import { Button, Dialog, TextField } from "@material-ui/core";
import { INewQuoteForm } from "interfaces/INewQuoteForm.interface";
import { FC, useState } from "react";
import { DefaultNewQuoteForm } from "./constants/DefaultNewQuoteForm";

import "./scss/NewQuoteModal.scss";

type Props = {
	open: boolean,
	setClose: () => void,
}

export const NewQuoteModal: FC<Props> = (props: Props) => {
	const [error, setError] = useState<string>("");
	const [form, setForm] = useState<INewQuoteForm>(
		DefaultNewQuoteForm
	);

	function handleChange(event: any) {
		setError("");
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	async function handleSubmit() {
		try {
		} catch (error: any) {
			setError(error.message);
			setForm(form);
		}
	};

	const modalBody = (
		<div>
			<h2 id="new-quote-modal-title">New quote</h2>
			<form onSubmit={handleSubmit} className="new-quote-form">
				<TextField
					id="standard"
					label="Quote"
					name="text"
					multiline
					rows={4}
					onChange={handleChange}
					value={form.text}
					className="new-quote-input"
					variant="outlined"
				/>
				<TextField
					id="standard"
					label="Source (optional)"
					name="source"
					onChange={handleChange}
					value={form.source}
				/>
				<TextField
					id="standard"
					label="Author (optional)"
					name="author"
					onChange={handleChange}
					value={form.author}
				/>
				<div className="new-quote-submit-button">
					<Button type="submit" onClick={handleSubmit}>Submit</Button>
				</div>
			</form>
			{error.length > 0 && (
				<div className="error">
					<p>{error}</p>
				</div>
			)}
		</div>
	);

	return (
		<div className="new-quote-modal">
			<Dialog
				open={props.open}
				onClose={props.setClose}
				aria-labelledby="new-quote-modal-title"
				aria-describedby="new-quote-modal-description"
				disableScrollLock={true}
			>
				{modalBody}
			</Dialog>
		</div>
	);
}