// Критерий сортировки byDuration: 
// исп-ся суммарная длительность in air в обоих направлениях

export function sortByDuration(tickets) {
  return tickets
    .slice()
    .sort((a, b) => {
      const firstTicketTotalDuration = a.segments.reduce((prev, item) => prev.duration + item.duration);
      const secondTicketTotalDuration = b.segments.reduce((prev, item) => prev.duration + item.duration);
      // Тоже самое: b.segments[0].duration + b.segments[1].duration
      // Array.prototype.reduce() на случай, если однажды в билетах вдруг станет больше 2-х полётов.
      return firstTicketTotalDuration - secondTicketTotalDuration;
    });
}

export function sortByPrice(tickets) {
  return tickets
    .slice()
    .sort((a, b) => a.price - b.price);
}