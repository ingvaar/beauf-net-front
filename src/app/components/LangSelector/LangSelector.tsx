import { NativeSelect } from "@material-ui/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { availableLanguages } from "src/i18n";

import './scss/lang-selector.scss';

export const LangSelector: FC = () => {
	const { i18n } = useTranslation()

	return (
		<div className="lang-selector">
			<NativeSelect
				value={i18n.language}
				onChange={(e) => i18n.changeLanguage(e.target.value)}
				name="lang"
				id="selector"
			>
				{availableLanguages.map((language) => (
					<option key={language} value={language}>{language}</option>
				))}
			</NativeSelect>
		</div>
	);
}