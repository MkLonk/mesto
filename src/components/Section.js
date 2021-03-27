/****************************************
 * Класс Section отвечает за отрисовку элементов на странице.
****************************************/

export default class Section {

  constructor(
    { renderer }, // функция, отвечает за создание и отрисовку данных на странице
    selectorContainer) { // cелектор контейнера, в который нужно добавлять элементы

    this._renderer = renderer;
    this._container = document.querySelector(selectorContainer);
  }

  renderItems(items) {
    items.forEach(item => this._renderer(item));
  }


  addItem(element, whereInsert) {
    if (whereInsert === 'up') {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}



/* export default class Section {

  constructor(
    items, // это массив данных, которые нужно добавить на страницу
    { renderer }, // функция, отвечает за создание и отрисовку данных на странице
    selectorContainer) { // cелектор контейнера, в который нужно добавлять элементы

    this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(selectorContainer);
    //this._api = api;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }


  addItem(element, whereInsert) {
    if (whereInsert === 'up') {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
} */