# RBAC Authentication System

Full-stack authentication system with Role-Based Access Control built using Laravel (API) and Next.js (Frontend).

## Features

- User Registration
- Login Authentication
- Email Verification
- Forgot Password
- Role Based Access Control (Admin, Manager, Employee)
- Dashboard with Charts
- User Management (CRUD)
- Secure API with Laravel Sanctum

## Tech Stack

Frontend:
- Next.js
- TailwindCSS
- Chart.js

Backend:
- Laravel
- MySQL
- Sanctum Authentication

## Installation

### Backend

cd backend

composer install

cp .env.example .env

php artisan key:generate

php artisan migrate --seed

php artisan serve

### Frontend

cd frontend

npm install

npm run dev


