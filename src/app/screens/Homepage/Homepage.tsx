import { Component } from "react";

import { QuotesListPage } from "../QuotesList/QuotesList.screen";

import "./scss/Homepage.scss";

export class Homepage extends Component {
	render() {
		return (
			<div id="homepage">
				<QuotesListPage />
			</div>
		);
	}
};
