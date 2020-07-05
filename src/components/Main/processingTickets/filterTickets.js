// Критерий фильтра: 
// используется наибольшее (из двух направлений) количество пересадок

export default function filterTickets(tickets, activeFilters) {
  if (activeFilters['all']) {
    return tickets;
  }
  const neededStops = Object.entries(activeFilters)
    .filter(item => item[1])
    .map(item => +item[0]);

  return tickets.filter(ticket => neededStops.includes(getMaxStopsOf(ticket)));
}

function getMaxStopsOf(ticket) {
  return Math.max(ticket.segments[0].stops.length, ticket.segments[1].stops.length);
}