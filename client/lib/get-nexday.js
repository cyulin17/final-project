export default function nextDate() {

  const nextDay = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  const year = nextDay.getFullYear();
  let month = nextDay.getMonth() + 1;
  let day = nextDay.getDate();

  if (month < 10) {
    month = '0' + month;
  }

  if (day < 10) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`;
}
