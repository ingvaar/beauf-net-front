import 'react-i18next';

import en from 'src/locales/en';

declare module 'react-i18next' {
	interface CustomTypeOptions {
		defaultNS: 'translation';
		resources: typeof en;
	};
}