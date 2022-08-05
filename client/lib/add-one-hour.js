export default function addOneHour(startTime, hour) {
  const array = startTime.split(':');
  let hours = parseInt(array[0]);
  let minutes = parseInt(array[1]);

  hours = hours + hour;

  if (hours > 23) {
    hours = hours - 24;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  return `${hours < 10 ? '0' + hours : hours}:${minutes}`;
}
