import { useTranslation } from 'react-i18next';

export const useCustomTranslation = (chapter: string) => {
	const { t } = useTranslation();

	return {
		...(t(chapter) as any)
	};
};
