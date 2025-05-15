# Easy CV - Resume Builder

A modern web application for creating professional resumes and CVs. Built with React and Laravel.

## Quick Start

1. Clone and setup:
```bash
git clone https://github.com/ayman-belarbi/easy-cv.git
cd easy-cv
```

2. Frontend setup:
```bash
cd frontend
npm install
npm run dev
```

3. Backend setup:
```bash
cd backend
composer install
php artisan serve
```

4. Database setup:
```bash
# Create MySQL database
mysql -u root -p
CREATE DATABASE easycv;
exit;

# Import the database schema
mysql -u root -p easycv < database/easycv.sql
```

## Features

- Create and edit professional resumes
- Multiple resume templates
- Export to PDF
- User authentication
- Save and manage multiple resumes
- Responsive design

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Radix UI Components
- React Router
- React Query
- i18next
- jsPDF

### Backend
- Laravel (PHP)
- MySQL
- RESTful API

## Development

### Frontend Development
- Run `npm run dev` in the frontend directory
- Access the frontend at `http://localhost:5173`

### Backend Development
- Run `php artisan serve` in the backend directory
- Access the API at `http://localhost:8000`

### Database
- MySQL database named 'easycv'
- Import the database schema from `database/easycv.sql`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
