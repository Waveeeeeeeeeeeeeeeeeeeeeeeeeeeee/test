import { useEffect, useState } from 'react';

interface IDescription {
  text: string;
  maxLength: number;
}

export const useDescription = ({ text, maxLength = 100 }: IDescription) => {
  const [displayText, setDisplayText] = useState(text);
  const [isCuted, setIsCuted] = useState(true);

  useEffect(() => {
    if (isCuted && text.length > maxLength) {
      const slicedText = text.slice(0, maxLength);
      setDisplayText(slicedText);
    } else {
      setDisplayText(text);
    }
  }, [text, maxLength, isCuted]);

  return {
    displayText,
    setIsCuted,
    isLongText: text.length > maxLength,
    isTextCut: isCuted && text.length > maxLength,
    isTextExpanded: !isCuted && text.length > maxLength
  };
};