import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
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
	.use(LanguageDetector)
	.init({
		resources,
		defaultNS: "translation",
	});