import * as UI from './effects'

// после каждого клика перезапускает время для анимаций и setState
const rebootableDelayDecorator = (ms, functionsStart, functionsEnd) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    if (functionsStart.length > 0) {
      functionsStart.forEach(func => func(...args));
    }
    timer = setTimeout(() => {
      functionsEnd.forEach(func => func(...args));
      clearTimeout(timer);
    }, ms);
  }
}



// хелпер для передачи контекста bufferingDecorator
const updateState = (context, newState) => {
  context.setState(() => newState);
}



const bufferingDecorator = (context, ms) => {
  
  // *Буфер сохраняет желаемые параметры поиска
  const BUFFER = Object.assign({}, context.state);
  const setStateAfterDelay = rebootableDelayDecorator(ms, [], [updateState]);

  // *Визуальная обратная связь для юзера на время таймаута
  // Set используется в UI.highlightCheckboxOn/Off: обработка UI отделена от состояния контролов,
  // т.к. завязаться на стейт не вариант - есть таймаут, а обратную связь надо сразу
  const bufferForUI = new Set();
  const showVisualFeedback = rebootableDelayDecorator(
    ms,
    [UI.highlightCheckboxOn, UI.runWaitingTimer],
    [UI.highlightCheckboxOff, UI.stopWaitingTimer]
  );

  return (e) => {
    // Сохранение состояния контролов на момент ПОСЛЕДНЕГО клика
    if (e.currentTarget.classList.contains('tabs')) {
      BUFFER.sort = e.target.dataset.sorter;
      UI.highlightActiveTab(e);
    } else {
      BUFFER.filters = context.getValidCheckboxes(e);
    }
    showVisualFeedback(bufferForUI, e);
    setStateAfterDelay(context, BUFFER);
  }
}

export default bufferingDecorator;