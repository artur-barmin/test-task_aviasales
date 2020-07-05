// Проверка "можно ли изменить состояние фильтра" тк частично исключают друг друга
export default function getValidCheckboxes(e) {
  const FILTERS = this.state.filters;
  const id = e.target.id;

  // Предотвращение состояния "все фильтры отключены"
  if (FILTERS[id] && Object.entries(FILTERS).filter(item => item[0] !== id).every(item => !item[1])) {
    return FILTERS;
  }

  // Отключение фильтра "Все" в случае клика по любому другому
  if (FILTERS['all'] && !FILTERS[id] && id !== 'all') {
    const st = Object.assign({}, this.state);
    st.filters['all'] = false;
    st.filters[id] = !st.filters[id];
    return st.filters;
  }

  // Отключение всех фильтров в случае клика по "Все", кроме него
  if (id === 'all' && Object.values(FILTERS).some(item => item)) {
    const st = Object.assign({}, this.state);
    for (let item in st.filters) {
      if (st.filters.hasOwnProperty(item)) {
        st.filters[item] = false;
      }
    }
    st.filters['all'] = true;
    return st.filters;
  }

  // Активация фильтров во всех других случаях
  const st = Object.assign({}, this.state);
  st.filters[id] = !st.filters[id];
  return st.filters;
}