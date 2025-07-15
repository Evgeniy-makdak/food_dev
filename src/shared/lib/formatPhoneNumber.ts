export const formatPhoneNumber = (input: string): string => {
  // Удаляем все нецифровые символы
  const cleaned = input.replace(/\D/g, '');

  // Ограничиваем длину до 11 цифр (с учетом кода страны)
  const limited = cleaned.slice(0, 11);

  // Форматируем номер
  let formatted = '';
  if (limited.length > 0) {
    formatted += '+7 ';
    if (limited.length > 1) {
      formatted += `(${limited.slice(1, 4)}`;
      if (limited.length > 4) {
        formatted += `) ${limited.slice(4, 7)}`;
        if (limited.length > 7) {
          formatted += ` ${limited.slice(7, 9)}`;
          if (limited.length > 9) {
            formatted += ` ${limited.slice(9)}`;
          }
        }
      }
    }
  }

  return formatted;
};