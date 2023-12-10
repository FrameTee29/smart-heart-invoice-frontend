import dayjs from 'dayjs';

export const formatDate = (date: string, format: string = 'YYYY MMMM DD HH:mm:ss') => {
  return dayjs(date).format(format);
};

export const formatDateInvoice = (date: string, format: string = 'MMMM DD, YYYY ') => {
  return dayjs(date).format(format);
};
