import { history } from "App";
import { Component } from "react";
import { useHistory } from "react-router-dom";

import "./scss/Menubar.scss";

interface props {

}

export class Menubar extends Component {

	constructor(props: props) {
		super(props);
		this.state = {

		}
	}

	private async handleSignOut() {
		window.localStorage.removeItem("token");
	}

	private goToLogin() {
		history.push("/login")
	}

	private login(): JSX.Element {
		if (window.localStorage.getItem('token')) {
			return (
				<div className="signout-button">
					<button onClick={this.handleSignOut}>Disconnect</button>
				</div>
			);
		} else {
			return (
				<div className="login-button">
					<button onClick={this.goToLogin}>Admin</button>
				</div>
			);
		}
	}

	public render(): JSX.Element {
		return (
			<div id='menubar'>
				{this.login()}
			</div>
		);
	}
}