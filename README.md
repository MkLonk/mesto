# Mesto

Проект **Mesto** является результатом выполнения проектных работ 4 - 7, студента **Михайлова Михаила**, работа выполнена в рамках курса №3 **Базовый JavaScript и работа с браузером** и №4 **JavaScript — непростые концепции** по специальности **Веб-разработчик**, на платформе **Яндекс Практикума**.

Файловая структура проекта оформлена по правилам Nested БЭМ. Использованы технологии **HTML5, CSS и JavaScript**, выполнена адаптация для разрешений от 1280px до 320px. Проект сверстан по [макету](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4).
Дополнительно использовалась подгонка верстки к макету "пиксель к пикселю" с помощью приложения **Perfect Pixel**.

В рамках **Проектной работы №5**, реализована следующая функциональность:
  1. Элементы галереи загружаются скриптом **JavaScript** из массива **initialCards**, сам массив отдельно вынесен в одноименный файл.
  2. Добавлена форма **Новое место** для новой карточки. Форма открывается нажатием на кнопку «+» и закрывается кликом на крестик, или за границу формы.
  3. При заполнении полей формы **Новое место**, нажатие кнопки **Сохранить**, добавит новое место как элемент галереи. Новый элемент появится вначале галереи.
  4. Карточкам можно ставить (и убирать) лайки.
  5. На карточках появилась кнопка **Delete** (корзина), теперь карточки можно удалять из галереи нажатием этой кнопки.
  6. Теперь любую картинку галереи можно посмотреть в "полном экране", для этого нужно кликнуть на картинку в галереи.
  7. Все попапы в проекте теперь плавно открываются и закрываются.


В рамках **Проектной работы №6**, добавлена следующая функциональность:
  1. Валидация всех форм на **JavaScript**. Скрипт с валидацией вынесен в отдельный файл **validate.js**, в этом же файле находится объект **settingsForm** с настройками валидации. 
  2. Закрытие попапов кликом на оверлей и нажатием на клавишу Esc.

В рамках **Проектной работы №7** начата работа по рефакторингу, изменения затронули следующие части кода:
  1. Написан класс **Card** который вынесен в отдельный файл-модуль **Card.js**. 
    а. Класс принимает в конструктор два объекта, первый передает данные (название и ссылку для картинки), второй настройки с селекторами классов.
    б. Класс содержит приватные методы, которые работают с разметкой и устанавливают слушателей событий.
    в. Класс содержит один публичный метод **generateCard**, который возвращает полностью работоспособный и наполненный данными элемент карточки.
  2. Написан класс **FormValidator** который вынесен в отдельный файл-модуль **FormValidator.js**. 
    а. Класс принимает в конструктор элемент формы, которая валидируется. Вторым параметром принимает объект настроек с селекторами и классами формы.
    б. Класс имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики.
    в. Класс содержит один публичный метод **enableValidation**, который включает валидацию формы.
  3. Объекты с настройками для классов **Card** и **FormValidator**, вынесены в отдельные файлы-модули **settingsCard.js** и **settingsFormValid.js**.
  4. Создан файл-модуль **dataCards.js** содержащий одноименный массив **dataCards**, который заполнен объектами с данными о существующих карточках. При загрузке приложения этот массив передает классу **Card** как параметр каждый свой элемент (объект), а **Card** методом **generateCard** возвращает готовый элемент галереи.
  5. Все файлы-модули импортируются в **index.js** в котором происходит окончательная сборка приложения.


Чтобы прейти к проекту **Mesto** нажмите [ссылку](https://mklonk.github.io/mesto/index.html).