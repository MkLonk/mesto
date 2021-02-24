export const settingsCard = {
  // селекторы элементов из шаблока "card-template", в эти элементы будут добавляться данные
  selectorTemplate: '.card-template',
  selectorGalleryElement: '.gallery__element',
  selectorImage: '.card__image',
  selectorTitle: '.card__caption',

  // селекторы кнопок из шаблока "card-template"
  selectorButtonLike: '.card__like',
  selectorButtonDelete: '.card__delete',

  // селекторы модивикаторов
  selectorButtonLikeActive: 'card__like_active', // клас с активным лайком

  // селекторы попапа FullScreen
  selectorPopupFullScreen: '.popup_full-screen', // контейнер FullScreen
  selectorButtonCloseFullScreen: '.popup__button-close', // кнопка закрытия FullScreen
  selectorImageFullScreen: '.full-screen__image', // контейнер картинки
  selectorTitleFullScreen: '.full-screen__caption', // контейнер названия

  // селектор галереи в которую добавляются новые карточки
  selectorGalleryContainer: '.gallery__photo-grid',
};