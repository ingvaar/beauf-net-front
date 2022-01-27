import { Button, Dialog, Fab, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { INewQuoteForm } from "interfaces/INewQuoteForm.interface";
import { IQuotePublic } from "interfaces/IQuotePublic.interface";
import { FC, FormEvent, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { QuoteService } from "services/quotes.service";
import { CDefaultNewQuoteForm } from "./constants/DefaultNewQuoteForm";
import { CDefaultQuotePublic } from "./constants/DefaultQuotePublic";

import "./scss/NewQuoteModal.scss";

interface IProps {
	open: boolean,
	setClose: () => void,
}

export const NewQuoteModal: FC<IProps> = (props: IProps) => {
	const [error, setError] = useState<string>("");
	const [form, setForm] = useState<INewQuoteForm>(
		CDefaultNewQuoteForm
	);
	const [newQuote, setNewQuote] = useState<IQuotePublic>(
		CDefaultQuotePublic
	);
	const [posted, setPosted] = useState<boolean>(false);

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	function handleChange(event: any) {
		setError("");
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	function closeModal(event: any) {
		event.preventDefault();
		props.setClose();
		setPosted(false);
		setNewQuote(CDefaultQuotePublic);
	}

	async function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			const captchaToken = await recaptchaRef?.current?.executeAsync();
			recaptchaRef?.current?.reset();

			form.captcha = captchaToken as string;
			setNewQuote(await QuoteService.postQuote(form));
			setPosted(true);
		} catch (error: any) {
			setError(error.message);
			setForm(form);
		}
	};

	const quoteBody = (
			<div className="posted-quote-body">
				<h2 id="posted-quote-title">Quote submitted !</h2>
				<span id="posted-quote-text">{newQuote.text}</span>
				{
					newQuote.source.length > 0 &&
					<span id="posted-quote-source">{newQuote.source}</span>
				}
				<div className="button-close-posted-quote">
					<Fab aria-label="close" variant="extended" onClick={closeModal}>
						<Close />
						Close
					</Fab>
				</div>
			</div>
	);

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
				<ReCAPTCHA
					ref={recaptchaRef}
					size="invisible"
					sitekey="6Lf_NSYeAAAAAMy7_aqunGGn_T4tgjfZ-DuoAYlp"
				/>
				<div className="new-quote-submit-button">
					<Button type="submit">Submit</Button>
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
				onClose={closeModal}
				aria-labelledby="new-quote-modal-title"
				aria-describedby="new-quote-modal-description"
				disableScrollLock={true}
			>
				{posted === false ? modalBody : quoteBody}
			</Dialog>
		</div>
	);
}