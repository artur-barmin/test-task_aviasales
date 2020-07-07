## About
React-приложение для поиска билетов с сортировкой и фильтрацией. Билеты генерируются случайным образом и прилетают пачками (до 10 тысяч за сеанс поиска) с небольшого сервера Aviasales, отведенного специально под тестовое задание. <br />
А вот [формулировка тестового задания](https://github.com/KosyanMedia/test-tasks/tree/master/aviasales_frontend).

Библиотеки: только React ([create-react-app](https://github.com/facebook/create-react-app))

## Demo
https://artur-barmin.github.io/test-task_aviasales/

## Run local
Необходимо склонировать репозиторий, установить зависимости и запустить: <br />
`$ git clone https://github.com/artur-barmin/test-task_aviasales.git [optionalYourDirectory]` <br />
`$ npm i` <br />
`$ npm start`

## Features

### 1. Обратная связь интерфейса на действия пользователя
В макете Figma не показано, как UI должен реагировать, поэтому добавил на свой вкус:
- анимацию кликнутых, но ещё не зафиксированных фильтров "Количество пересадок"
- подсказку вверху вьюпорта о том, что есть время изменить параметры поиска
- прелоадер на время загрузки и обработки билетов

*Сравнение без / с таймаутом перед поиском:*
![screencast](https://i.postimg.cc/nrXDRzTQ/screencast.gif)

### 2. Ожидание 2000 мс перед поиском
**Зачем** <br />
Также в макете нет кнопки "search" или подобного, по которому пользователь может запустить поиск, поэтому счел нужным:
- вернуть пользователю ощущение контроля происходящего - дать время прокликать нужные контролы
- снизить нагрузку на бэкенд - не дергать сервер на каждый чих, за счет повышения вероятности, что пользователь успел ввести все нужные параметры поиска

**Как работает**
- Перезапускающий таймаут декоратор - после каждого клика таймер перезапускается, давая полные 2000 мс на следующий клик<br />
(`rebootableDelayDecorator`)
- Буфер в замыкании - после каждого клика сохраняет параметры поиска. По истечению 2000 мс они будут сохранены в `App.state`<br />
(`bufferingDecorator`)

### 3. Предохранитель от бесконечного цикла в сеансе поиска
Внутри сеанса поиска запросы на сервер отправляются в цикле. Штатно поиск прекращается после сообщения сервера `search.stop === true`. На случай ошибки сервера добавлен лимит в 100 запросов на сеанс, при достижении которого поиск прекращается и успевшие прилететь билеты отдаются в сортировку-фильтрацию-рендеринг.

## Структура
`/src/index.js` - точка входа и корневой компонент App (в одном файле совмещены index.js и App.js, против распространенного подхода с отдельными файлами).

В `/src/components/` директории организованы согласно визуальному делению страницы на блоки:
- WaitingTimer - подсказка в верхней части вьюпорта
- Header - логотип сервиса в шапке
- Sidebar - компонент-прокси, добавлен только из соображений БЭМ-верстки
  - Filter - хранит тексты для label фильтров
    - FilterItem - отдельный фильтр (checkbox + label)
- Main - управляет операциями над билетами, хранит в state 5 релевантных билетов
  - processingTickets - функции поиска билетов, фильтрация и сортировка
  - Tabs - переключатель сортировки
  - TicketList - список билетов или анимация ожидания загрузки
    - Preloader - анимация ожидания билетов
    - Ticket - цена, лого авиаперевозчика с CDN'а
      - Flight - информация по направлениям "туда-обратно"
        - FlightOrigDest - время и пункты вылета/посадки
        - FlightDuration - длительность перелета в формате hh:mm
        - FlightStops - количество и пункты пересадок
- UI - функции для лучшего пользовательского опыта
  - effects.js - визуальные эффекты для таймаута. В основном, добавляют/удаляют CSS-классы
  - handlers.js - обработчики кликов, продлевающийся таймаут для ввода параметров поиска, управление стейтом
  - validation.js - интуитивно понятное переключение чекбоксов

## Общий алгоритм
- Параметры поиска хранятся в `App.state`
- Билеты хранятся в `Main.state`
- Фильтры (input checkbox) реализованы как *управляемые компоненты* `FilterItem`: получают checked из `App.state`.

1) Загрузка билетов по дефолтным параметрам поиска
2) Клик пользователя
3) Управление переключением фильтров (/src/components/UI/validation.js)
4) Таймаут 2000 мс, запись в буфер и анимация
5) Запись новых параметров поиска в `App.state`
6) Работа с билетами после обновления `Main.props`
   1) Получение ID сеанса поиска
   2) Получение билетов пачками, рекурсивный вызов на случай 500 ошибки
   3) Завершение сеанса поиска
   4) Фильтрация билетов - сопоставление фильтров с каждым билетом
   5) Сортировка
   6) Возврат 5 первых билетов
7) Рендер билетов