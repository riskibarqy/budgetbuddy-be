# Money Manager API

## Overview
The Money Manager API is a Node.js application designed to help users manage their finances. It provides a set of endpoints that can be consumed by Flutter applications, allowing users to track their transactions, accounts, and budgets.

## Features
- User authentication using Clerk
- Data storage with PostgreSQL (Neon DB)
- Caching with Redis (Upstash)
- Message queue support (Upstash)
- Logging with Uptrace

## Project Structure
```
money-manager-api
├── src
│   ├── application
│   │   ├── use-cases
│   │   └── services
│   ├── domain
│   │   ├── entities
│   │   └── repositories
│   ├── infrastructure
│   │   ├── db
│   │   │   ├── postgres
│   │   │   └── redis
│   │   ├── mq
│   │   ├── logging
│   │   └── auth
│   ├── interfaces
│   │   ├── controllers
│   │   └── routes
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- PostgreSQL (Neon DB)
- Redis (Upstash)
- Uptrace for logging
- Clerk for authentication

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/money-manager-api.git
   cd money-manager-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Configuration
- Create a `.env` file in the root directory and add your configuration variables for PostgreSQL, Redis, Uptrace, and Clerk.

### Running the Application
To start the server, run:
```
npm run start
```

### API Endpoints
The API provides various endpoints for managing users, transactions, and accounts. Refer to the documentation in the `src/interfaces/routes` directory for detailed information on available routes.

### Logging
All logs are handled by Uptrace. Ensure your Uptrace configuration is set up correctly in the `.env` file.

### Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.