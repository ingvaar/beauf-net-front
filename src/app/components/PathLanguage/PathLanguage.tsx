import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
	Navigate, useParams, useLocation,
} from 'react-router-dom';

import { availableLanguages } from 'src/i18n';

export const changePathLang = (path: string, lang: string): string => `/${lang}${path.substring(path.indexOf('/', 1))}`;

interface Props {
	children: JSX.Element,
};

export function PathLanguage(props: Props): JSX.Element {
	const { i18n } = useTranslation();
	const { lang } = useParams();
	const { pathname } = useLocation();

	useEffect(() => {
		if (lang !== i18n.language && lang && availableLanguages.includes(lang)) {
			i18n.changeLanguage(lang).catch(() => { });
		}
	}, [lang, i18n]);

	if (lang && !availableLanguages.includes(lang)) {
		return <Navigate to={changePathLang(pathname, i18n.language)} />;
	}
	return props.children;
}
