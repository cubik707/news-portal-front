export const formatDateTime = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  },
  locale: string = 'ru-RU'
): string => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(locale, options).format(date);
  } catch (e) {
    return 'Неверная дата';
  }
};