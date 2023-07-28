# Проект Mesto фронтенд + бэкенд

[![Tests 13 sprint](https://github.com/DenisIlyushin/express-mesto-gha/actions/workflows/tests-13-sprint.yml/badge.svg?branch=main)](https://github.com/DenisIlyushin/express-mesto-gha/actions/workflows/tests-13-sprint.yml)
[![Tests 14 sprint](https://github.com/DenisIlyushin/express-mesto-gha/actions/workflows/tests-14-sprint.yml/badge.svg?branch=main)](https://github.com/DenisIlyushin/express-mesto-gha/actions/workflows/tests-14-sprint.yml)
---
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

`/middleware` — папка c middleware обработчиками (in dev)

`/utils` — папка с универсальными функциями (in dev)

## Запуск проекта

После клонирования репозитория требуется установить зависимости:

```bash
npm install
```

`npm run start` — запускает сервер, 
`npm run dev` — запускает сервер с hot-reload (dev-mode)
