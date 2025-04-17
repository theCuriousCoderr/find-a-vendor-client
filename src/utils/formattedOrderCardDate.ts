export default function formattedOrderCardDate(date: Date) {
  const _date = new Date(date).getTime();
  const day = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(_date);

  const time = new Date(_date).toLocaleString().split(",")[1].trim();

  return `${day} - ${time}`;
}
