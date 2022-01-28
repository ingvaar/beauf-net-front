import { Copyright, Favorite } from "@material-ui/icons"
import { FC } from "react"
import { useHistory } from "react-router-dom";

import "./scss/Footer.scss";

export const FooterComponent: FC = () => {
	const history = useHistory();

	const aboutUs = () => {
		history.push("/about-us");
	}

	const modRequest = () => {
		history.push("/mod-request");
	}

	return (
		<footer id='footer'>
			<div className="copyright">
				<Copyright id="copyright" /> Made with <Favorite id="heart" /> by <a href="https://github.com/ingvaar/">Ingvaar</a>
			</div>
			<div className="utils">
				<span onClick={aboutUs}>About us</span>
				<span onClick={modRequest}>Become a moderator</span>
			</div>
		</footer>
	)
}