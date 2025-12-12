# AngNet Ecommerce

A full-stack e-commerce application built with **.NET 9** (Backend) and **Angular 19** (Frontend).

## 🚀 Features

- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Product Management**: Browse and view product details.
- **Shopping Cart**: Add items to cart and manage cart contents.
- **Order System**: Place orders and track order history.
- **Reviews**: Leave reviews for products.
- **Responsive Design**: Built with Bootstrap 5 for a mobile-friendly experience.

## 🛠 Technology Stack

### Backend
- **Framework**: .NET 9.0 (ASP.NET Core Web API)
- **Database**: MySQL
- **ORM**: Entity Framework Core 9.0 (Pomelo.EntityFrameworkCore.MySql)
- **Authentication**: JWT Bearer Authentication
- **Documentation**: Swagger / OpenAPI

### Frontend
- **Framework**: Angular 19
- **Styling**: Bootstrap 5, Font Awesome
- **HTTP Client**: Angular HttpClient
- **Notifications**: ngx-toastr

## 📋 Prerequisites

Ensure you have the following installed on your machine:
- [.NET 9.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [Angular CLI](https://angular.io/cli) (Version 19)
- [MySQL Server](https://dev.mysql.com/downloads/installer/)

## ⚙️ Installation & Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/AngNetEcommerce.API
   ```

2. Configure the database connection:
   - Open `appsettings.json`.
   - Update the `DefaultConnection` string with your MySQL credentials.
   - Update `Jwt:Key`, `Jwt:Issuer`, and `Jwt:Audience` if necessary.

3. Apply database migrations (if not auto-seeded) or ensure the database exists:
   ```bash
   dotnet ef database update
   ```
   *Note: The application is configured to initialize and seed the database on startup (Check `Program.cs` and `DbInitializer`).*

4. Run the backend API:
   ```bash
   dotnet run
   ```
   The API will start at `http://localhost:5033` (or the configured port).
   Swagger documentation is available at `http://localhost:5033/swagger` during development.

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   ng serve
   ```

4. Open your browser and navigate to `http://localhost:4200`.

## 📂 Project Structure

```
AngNet Ecommerce/
├── backend/               # ASP.NET Core Web API
│   └── AngNetEcommerce.API/
│       ├── Controllers/   # API Endpoints
│       ├── Models/        # Database Entities
│       ├── Data/          # DB Context & Initializer
│       └── Program.cs     # App Configuration
│
├── frontend/              # Angular Client App
│   └── src/
│       └── app/
│           ├── components/ # UI Components
│           ├── services/   # API Services
│           └── models/     # TypeScript Interfaces
└── README.md              # Project Documentation
```

## 🤝 Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
