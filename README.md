# Easy CV | Resume Builder

A modern web application for creating professional resumes and CVs. Built with React and Laravel.

---

## Quick Start

### Clone and setup

```bash
git clone https://github.com/ayman-belarbi/easy-cv.git
cd easy-cv
```

---

### Frontend setup

```bash
cd frontend
npm install
npm run dev
```

---

### Backend setup

```bash
cd backend
composer install
php artisan serve
```

---

### Database setup

```bash
CREATE DATABASE easycv;
```

**For Command Prompt (CMD):**

```bash
cd database
mysql -u root -p easycv < easycv.sql
```

**For PowerShell:**

```bash
cd database
Get-Content .\easycv.sql | & "C:\xampp\mysql\bin\mysql" -u root -p easycv
```

---

## Features

* Create and edit professional resumes
* Multiple resume templates
* Export to PDF
* User authentication
* Save and manage multiple resumes
* Responsive design

---

## Tech Stack

### Frontend

* React 19
* Vite
* Tailwind CSS
* Radix UI Components
* React Router
* React Query
* i18next
* jsPDF

### Backend

* Laravel (PHP)
* MySQL
* RESTful API

---

## Development

### Frontend Development

* Run `npm run dev` in the `frontend` directory
* Access the frontend at: `http://localhost:5173`

### Backend Development

* Run `php artisan serve` in the `backend` directory
* Access the API at: `http://localhost:8000`

---

## Database

* MySQL database named `easycv`
* Import the database schema from `database/easycv.sql`
