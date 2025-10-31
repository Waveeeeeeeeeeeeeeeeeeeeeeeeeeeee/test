export const validateNickname = (
nickname: string)
: {isValid: boolean;message?: string;} => {
  const cleanedNickname = nickname.trim();

  if (!cleanedNickname) {
    return { isValid: false, message: 'Никнейм не может быть пустым' };
  }

  const allowedLetters =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZабвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ0123456789_';

  if (cleanedNickname.length < 4 || cleanedNickname.length > 32) {
    return {
      isValid: false,
      message: 'Никнейм должен содержать от 4 до 32 символов'
    };
  }

  if ([...cleanedNickname].some((char) => !allowedLetters.includes(char))) {
    return {
      isValid: false,
      message: 'Разрешены только буквы, цифры и символ _'
    };
  }

  if (cleanedNickname[0].match(/[0-9_]/)) {
    return {
      isValid: false,
      message: 'Никнейм не может начинаться с цифры или подчеркивания'
    };
  }

  if (new Set(cleanedNickname.toLowerCase()).size === 1) {
    return {
      isValid: false,
      message: 'Никнейм не может состоять из одинаковых символов'
    };
  }

  return { isValid: true };
};