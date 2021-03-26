/*
Класс Section отвечает за отрисовку элементов на странице.
*/

export default class Section {

  constructor(
    { /* items, // это массив данных, которые нужно добавить на страницу */
      renderer }, // функция, отвечает за создание и отрисовку данных на странице
    selectorContainer, api) { // cелектор контейнера, в который нужно добавлять элементы

    //this._items = items;
    this._renderer = renderer;

    this._container = document.querySelector(selectorContainer);
    this._api = api;
  }

  renderItems() {
    this._api.loadCards()
      .then(dataArr => {
        dataArr.forEach(item => this._renderer(item));
      })
      .catch(err => `Ошибка renderItems ${err}`)
  }


  addItem(element, whereInsert) {
    if (whereInsert === 'up') {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}