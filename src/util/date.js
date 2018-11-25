import moment from 'moment';

export function formatDate(startDate, endDate) {
  const start = startDate ? moment(startDate).format('MMMM DD') : '';
  const end = endDate ? moment(endDate).format('MMMM DD') : '';

  return start
    + (start && end && start !== end ? ' - ' : '')
    + (start !== end ? end : '');
}
