[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) 
[![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## О проекте

Учебный проект, курс WEB-разработчик, спринт 13.
[Яндекс.Практикум](https://practicum.yandex.ru/).

Проект посвящен вымышленному сервису **Mesto** - интерактивной странице, куда
можно добавлять фотографии, удалять их и ставить лайки.

Данная реализация представляет собой бекенд для [сайта проекта 
место](https://denisilyushin.github.io/react-mesto-auth/). На данный момент фронт
сайта не сопряжен с разрабатываемым бекендом.

## Технологии

- NodeJS
- Express
- mongoDB
- Mongoose

## Дополнительные модули

- [http-status-codes](https://www.npmjs.com/package/http-status-codes) -
  константы, перечисляющие коды состояния HTTP. Основан на Java Apache Http Status API.

## Директории

`/routes` — папка с файлами роутера
`/controllers` — папка с файлами контроллеров пользователя и карточки
`/models` — папка с файлами описания схем пользователя и карточки
`/errors` — папка с кастомными ошибками
  
Остальные директории вспомогательные, создаются при необходимости разработчиком

## Запуск проекта
После клонирования репозитория требуется установить зависимости:
```bash
npm install
```

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload
