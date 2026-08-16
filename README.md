# Enterprise Business Management System

A modular web-based Enterprise Business Management System developed to support business operations through centralized management of customers, products, articles, users, and related business information.

## Overview

The Enterprise Business Management System is a multi-layered web application designed to provide a structured platform for managing business data and administrative operations.

The system is organized using a layered architecture that separates the web application, domain/business logic, data-access components, and logging functionality. This separation improves maintainability, scalability, and organization of the application.

The implementation demonstrates practical use of ASP.NET Web API, Entity Framework, OAuth-based authentication, repository-based data access, and modern client-side web technologies.

## Key Features

- Customer and CRM management
- Company and contact management
- Address and contact information management
- Product and category management
- Article management
- User profile management
- Account and password management
- Authentication and authorization
- OAuth bearer-token authentication
- Entity Framework Code First data access
- Database migrations
- Repository and Unit of Work patterns
- Application logging
- Administrative web interface
- Responsive web-based UI
- Client-side data and application services

## Architecture

The system follows a layered architecture consisting of the following major components:

```text
Enterprise Business Management System
│
├── GOA.Web
│   ├── Controllers
│   ├── Services
│   ├── ViewModels
│   ├── Views
│   └── Authentication
│
├── GOA.Domain
│   ├── Domain Models
│   ├── Repository Interfaces
│   ├── Validators
│   └── Unit of Work Interfaces
│
├── GOA.Data
│   ├── Database Context
│   ├── Repositories
│   ├── Unit of Work
│   └── Entity Framework Migrations
│
└── GOA.Logger
    └── Application Logging
```
### Application Layers

| Component | Responsibility |
|---|---|
| **GOA.Web** | Web application, API controllers, authentication, services, views, and client-side functionality |
| **GOA.Domain** | Domain entities, business models, repository contracts, validation, and business abstractions |
| **GOA.Data** | Database access, Entity Framework context, repositories, Unit of Work, and migrations |
| **GOA.Logger** | Application logging functionality |

## Technology Stack

### Backend

- C#
- ASP.NET Web API
- .NET Framework 4.5.1
- Entity Framework 6
- OWIN
- SQL Server / LocalDB

### Frontend

- JavaScript
- HTML5
- CSS3
- jQuery
- Knockout.js
- Durandal.js
- Breeze.js
- Bootstrap

### Libraries & Tools

- Newtonsoft.Json
- NuGet
- Entity Framework Code First Migrations
- Repository Pattern
- Unit of Work Pattern
Repository Structure
```text
EnterpriseBusinessManagementSystem/
│
├── .gitignore
│
└── Implementation/
    │
    ├── GOA.Data/
    ├── GOA.Domain/
    ├── GOA.Logger/
    └── GOA.Web/
```
### GOA.Data

The data-access layer responsible for database interaction and persistence.

It includes:

- Entity Framework database context
- Repository implementations
- Unit of Work implementation
- Entity Framework migrations
- Data-access configuration

### GOA.Domain

The domain layer containing the core business entities and abstractions.

It includes:

- Business entities
- CRM models
- Product models
- Article models
- User profiles
- Repository interfaces
- Validation interfaces
- Unit of Work interfaces

### GOA.Logger

A dedicated component for application logging.

### GOA.Web

The web application layer containing the user interface, Web API functionality, authentication, services, and client-side application components.

## Authentication & Security

The application implements OAuth bearer-token authentication using OWIN middleware.

Authenticated requests use bearer-token authorization:
Authorization: Bearer <access-token>
No production passwords, API keys, private keys, certificates, or database credentials are included in the repository.

Environment-specific and deployment-specific credentials should be configured separately when running the application.

## Database

The application uses Entity Framework 6 for data access and supports Code First database migrations.

The database layer includes:

- Database context
- Entity configurations
- Repository implementations
- Unit of Work
- Initial database migration
- Migration configuration

A local database connection should be configured according to the developer's environment before running the application.

## Getting Started

### Prerequisites

The following environment is recommended for working with the project:

- Microsoft Visual Studio
- .NET Framework 4.5.1
- SQL Server or LocalDB
- NuGet package support

### Installation

1. Clone the repository.
2. Open the solution in Visual Studio.
3. Restore the required NuGet packages.
4. Configure the local database connection for the development environment.
5. Apply the required Entity Framework migrations.
6. Build the solution.
7. Run the `GOA.Web` application.

> **Note:** Environment-specific configuration and database credentials are not included in the repository and must be configured locally.

## Design Patterns

The implementation demonstrates several established software engineering practices:

- Layered Architecture
- Repository Pattern
- Unit of Work Pattern
- Entity Framework Code First
- Database Migration
- Token-Based Authentication
- Separation of Concerns
- Modular Component Design

## Project Purpose

This project demonstrates the design and implementation of an enterprise-oriented business management application using a layered Microsoft technology stack.

It provides an example of integrating web application development, domain modeling, database access, authentication, client-side application components, and application logging within a single structured system.

## License

No open-source license has been specified for this repository.

## Author

**Muhammad Ismail**

Lecturer | Computer Science & Software Engineering

GitHub: [mismail-research](https://github.com/mismail-research)
