export const getHeaderNavigation = (
	onGoBack?: () => void,
	defaultBack: () => void = () => {}
) => {
	return onGoBack ?? defaultBack;
};
