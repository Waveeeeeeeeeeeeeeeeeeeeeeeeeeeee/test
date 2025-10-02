import { useEffect, useState } from 'react';

interface IDescription {
	text: string;
	maxLength: number;
}

export const useDescription = ({ text, maxLength = 100 }: IDescription) => {
	const [displayText, setDisplayText] = useState(text);
	const [isCuted, setIsCuted] = useState(true);

	useEffect(() => {
		if (isCuted) {
			const slicedText = text.slice(0, maxLength);
			setDisplayText(text.length > maxLength ? slicedText + '...' : slicedText);
		} else {
			setDisplayText(text);
		}
	}, [text, maxLength, isCuted]);

	return {
		displayText,
		setIsCuted
	};
};
