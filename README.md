# Hive Task Manager Frontend

Это фронтенд-часть приложения "Менеджер задач Hive", построенная на Vue.js.

## Предварительные требования

- Node.js 16 или выше
- npm (обычно идет вместе с Node.js)
- Podman (опционально, для запуска в контейнере)

## Запуск без контейнера (локальная разработка)

### Установка зависимостей

```bash
npm install
```

### Запуск в режиме разработки

```bash
npm run serve
```

Приложение будет доступно по адресу [http://localhost:8080](http://localhost:8080).

### Сборка для production

```bash
npm run build
```

Собранные файлы будут помещены в директорию `dist/`.

## Запуск с помощью Podman

### Установка Podman

Для Ubuntu/Debian:
```bash
sudo apt-get update
sudo apt-get install podman
```

Для Fedora/RHEL:
```bash
sudo dnf install podman
```

### Сборка образа

```bash
npm run podman:build
```

Или вручную:
```bash
podman build --pull-always --format docker -t hive-frontend .
```

### Запуск контейнера

```bash
npm run podman:run
```

Или вручную:
```bash
podman run -p 8080:8080 --name hive-frontend-container hive-frontend
```

Приложение будет доступно по адресу [http://localhost:8080](http://localhost:8080).

### Управление контейнером

Остановка контейнера:
```bash
npm run podman:stop
```

Удаление контейнера:
```bash
npm run podman:remove
```

Перезапуск контейнера:
```bash
npm run podman:restart
```

Просмотр логов:
```bash
npm run podman:logs
```

### Полная очистка

Удаление образа:
```bash
npm run podman:clean
```

## Решение возможных проблем

### Ошибка с именем контейнера

Если возникает ошибка о том, что имя контейнера уже используется:
```bash
podman stop hive-frontend-container
podman rm hive-frontend-container
```

### Ошибка с базовыми образами

Если возникают проблемы с загрузкой базовых образов, убедитесь, что Podman настроен правильно:
```bash
mkdir -p ~/.config/containers
echo 'unqualified-search-registries = ["docker.io"]' > ~/.config/containers/registries.conf
```

## Структура проекта

- `src/components` - компоненты Vue (Header, Footer)
- `src/views` - страницы приложения
- `src/router` - конфигурация маршрутизации
- `public` - статические файлы
- `dist` - собранные файлы (после выполнения `npm run build`)

## Дополнительная информация

Этот проект использует Vue 3 и Vue Router для навигации. Для стилизации используется CSS с использованием подхода Scoped CSS.

Для запуска в контейнере используется Podman, но также можно использовать Docker, заменив команды `podman` на `docker`.