import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.locale('en-sg');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Singapore');
dayjs.extend(localizedFormat);

export const formatDateWithYear = (date, isSGT = true) => {
  if (date == null) {
    return '-';
  }
  if (!isSGT) {
    return dayjs(date).format('ll');
  }
  return dayjs(date).tz().format('ll');
};

export const formatDateWithoutYear = (date) => {
  if (date == null) {
    return '-';
  }
  return dayjs(date).tz().format('MMM D');
};

export const isBeforeByDate = (a, b) => {
  return dayjs(a).tz().startOf('day').isBefore(dayjs(b).tz().startOf('day'));
};

export const isSameByDate = (a, b) => {
  return dayjs(a)
    .tz()
    .startOf('day')
    .isSame(dayjs(b).tz().startOf('day'), 'date');
};

export const changeToUserTimezone = (date) => {
  const originalDateTimeString = dayjs(date).tz().format('LLL');
  return new Date(originalDateTimeString);
};

export const formatDuration = (duration) => {
  const date = new Date(duration);
  const seconds = date.getUTCSeconds();
  const minutes = date.getUTCMinutes();
  const hours = date.getUTCHours();
  const days = date.getUTCDate() - 1;
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
};

const isoDateFormat =
  /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/gm;

function isIsoDateString(value) {
  return (
    value != null &&
    typeof value === 'string' &&
    value.match(isoDateFormat) != null
  );
}

export function handleDates(body) {
  if (body == null || typeof body !== 'object') {
    return body;
  }

  for (const key of Object.keys(body)) {
    const value = body[key];
    if (isIsoDateString(value)) {
      body[key] = new Date(value);
    } else if (typeof value === 'object') {
      body[key] = handleDates(value);
    }
  }
  return body;
}