# PawPost

**PawPost** — простой веб-проект в формате каталога постов про животных.  
Проект реализуется в рамках учебного задания на создание CRUD-сайта с главной страницей, детальными страницами и открытой админкой.

---

## 1. Описание проекта

PawPost — это сайт, где пользователи могут просматривать карточки с постами про животных.  
Каждый пост содержит краткую информацию, изображение и отдельную страницу с подробным описанием.

Через отдельную админ-панель можно:

- добавлять новые посты;
- редактировать существующие посты;
- удалять посты;
- просматривать список всех записей.
---

## 2. Тема проекта

Тема каталога: **посты про животных**.

Примеры записей:

- домашние животные;
- интересные факты о животных;
- советы по уходу;
- редкие животные;
- истории о питомцах.

---

## 3. Цель проекта

Цель проекта — реализовать простой, но законченный CRUD-проект с сохранением данных, понятной структурой и рабочим интерфейсом.

Проект должен соответствовать требованиям технического задания:
---

## 4. Используемые технологии

### Frontend

- React
- TypeScript
- Vite
- React Router
- CSS 

### Backend

- C#
- ASP.NET Core Web API
- ADO.NET
- PostgreSQL

### База данных

- PostgreSQL

### Инструменты

- Git
- GitHub
- Visual Studio 
- pgAdmin 

---




##  Инструкция по запуску

### 1. Клонировать репозиторий

```bash
git clone https://github.com/username/pawpost.git
cd pawpost
```

---

### 2. Создать базу данных PostgreSQL

```sql
CREATE DATABASE pawpost_db;
```

Затем выполнить SQL-скрипт создания таблицы:

```sql
CREATE TABLE animal_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    short_description VARCHAR(300) NOT NULL,
    full_description TEXT NOT NULL,
    image_url TEXT,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### 3. Настроить backend

В файле `appsettings.json` указать строку подключения:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=pawpost_db;Username=postgres;Password=your_password"
  }
}
```

Запустить backend:

```bash
cd backend
dotnet restore
dotnet run
```

Backend будет доступен по адресу:

```txt
http://localhost:5000
```

---

### 4. Запустить frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend будет доступен по адресу:

```txt
http://localhost:5173
```

---

## 14. Проверка проекта

Для проверки проекта нужно:

1. Открыть главную страницу `/`.
2. Убедиться, что отображаются карточки постов.
3. Перейти на детальную страницу поста.
4. Открыть `/admin`.
5. Создать новый пост.
6. Отредактировать созданный пост.
7. Удалить пост.
8. Проверить, что данные сохраняются в PostgreSQL.
---

## Итог

PawPost — это простой учебный CRUD-каталог постов про животных.  
Проект демонстрирует базовую работу frontend, backend и базы данных:

- React отвечает за интерфейс;
- ASP.NET Core Web API отвечает за серверную часть;
- ADO.NET используется для работы с PostgreSQL;
- PostgreSQL хранит записи;
- админка позволяет управлять контентом.
