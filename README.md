# Генерация локального SSL-сертификата `tma.internal` с помощью mkcert на Windows

## 1. Установка Scoop

**Scoop** — это менеджер пакетов для Windows, который облегчает установку утилит командной строки.

1. Откройте PowerShell от имени пользователя и разрешите выполнение скриптов:

```powershell
1. Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
2. iwr -useb get.scoop.sh | iex
3. scoop --version
```

## 2. Установка mkcert

**mkcert** — это генератор локальных SSL/TLS сертификатов.

1. scoop bucket add extras
2. scoop install mkcert
3. mkcert --version

## 3. Установка локального корневого сертификата и сертификата для домена

1. mkcert install
2. нужно зайти в папку с проектом
3. mkcert tma.internal
4. Появившиеся сертификаты добавить в корневую папку проекта certs

project/
├─ certs/
│ ├─ tma.internal.pem
│ └─ tma.internal-key.pem

## 4. Для работы сертификата в Firefox

1. Найти корневой сертификат C:\Users\ВашЮзер\AppData\Local\mkcert
2. Зайти в Firefox в настройках приватность и защита
3. Сертификаты - Просмотр сертификатов
4. Импортировать корневой сертификат rootCA.pem
5. Разрешить для защищеного соединения сайтов
