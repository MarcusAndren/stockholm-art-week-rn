import moment from 'moment';

export function formatDate(startDate, endDate) {
  const start = startDate ? moment(startDate).format('MMMM DD') : '';
  const end = endDate ? moment(endDate).format('MMMM DD') : '';

  return start
    + (start && end && start !== end ? ' - ' : '')
    + (start !== end ? end : '');
}

export function weekdayInBetweenDates(weekday, startDate, endDate) {
  if(weekday === -1 || weekday === null) {
    return true;
  }

  const start = startDate ? moment(startDate) : '';
  const end = endDate ? moment(endDate) : '';

  if(start !== '' && end !== '') {
    if(start.diff(end, 'days') >= 7) {
      return true;
    }

    const startInt = parseInt(start.format('d'), 10);
    const endInt = parseInt(end.format('d'), 10);
    return startInt > endInt ? weekday >= startInt || weekday <= endInt : weekday >= startInt && weekday <= endInt;
  } else {
    return start !== '' ? parseInt(start, 10) === weekday : (end !== '' ? parseInt(end, 10) === weekday : false);
  }
}