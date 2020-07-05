// *** DELAYED: Подсветка кликнутых чекбоксов ***
// Задача: мгновенный UI-фидбек на клик (переключить CSS-класс)
// Проблема: это управляемый компонент
// Как связать удаление класса .buffered с обновлением state.filters?
// вариант 1: передавать delay в highlightFilterWhileDelay
// вариант 2: props.filters
// UPD: выбрал 1й вариант, fixed: рассинхрон с getValidCheckboxes
export function highlightCheckboxOn(stor, e) {
  const cssClass = 'buffered';
  if (e.target.matches('.' + cssClass)) {
    stor.delete(e.target);
    e.target.classList.remove(cssClass);
  } else {
    stor.add(e.target);
    e.target.classList.add(cssClass);
  }
}
export function highlightCheckboxOff(store) {
  const cssClass = 'buffered';
  store.forEach(item => item.classList.remove(cssClass));
  store.clear();
}

// *** DELAYED: бегущая строка в верху экрана ***
export function runWaitingTimer() {
  const bufferAnim = document.querySelector('.timeout');
  const animTip = document.querySelector('.timeout__tip');
  animTip.className = 'timeout__tip';
  bufferAnim.className = 'timeout';
  animTip.classList.add('timeout__tip_run');
  bufferAnim.classList.add('timeout_run');
}
export function stopWaitingTimer() {
  const bufferAnim = document.querySelector('.timeout');
  const animTip = document.querySelector('.timeout__tip');
  animTip.classList.remove('timeout__tip_run');
  bufferAnim.classList.remove('timeout_run');
}

// *** not delayed. Выделение выбранной сортировки ***
export function highlightActiveTab(e) {
  const cssClass = 'tabs__item_active';
  if (e.target.classList.contains(cssClass)) {
    return;
  } else {
    e.currentTarget.querySelector('.' + cssClass).classList.remove(cssClass);
    e.target.classList.add(cssClass);
  }
}