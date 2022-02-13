import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from 'i18next-http-backend';
import en from "./locales/en";
import fr from "./locales/fr";

const resources = {
	en,
	fr,
}

export const availableLanguages = Object.keys(resources);

i18n.use(initReactI18next)
	.use(Backend)
	.init({
		resources,
		defaultNS: "translation",
		fallbackLng: 'fr',
	});