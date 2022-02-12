import { Copyright, Favorite } from "@material-ui/icons"
import { FC } from "react"
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import "./scss/Footer.scss";

export const FooterComponent: FC = () => {
	const history = useNavigate();
	const { t } = useTranslation();

	const aboutUs = () => {
		history("about-us");
	}

	const modRequest = () => {
		history("mod-request");
	}

	return (
		<footer id='footer'>
			<div className="copyright">
				<Copyright id="copyright" /> Made with <Favorite id="heart" /> by <a href="https://github.com/ingvaar/">Ingvaar</a>
			</div>
			<div className="utils">
				<span onClick={aboutUs}>{t('aboutUs')}</span>
				<span onClick={modRequest}>{t('becomeAMod')}</span>
			</div>
		</footer>
	)
}