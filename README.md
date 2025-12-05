# Apollo Coding Challange

## Description

This is a simple vehicle management API built with Node.js, Express, and MongoDB. It provides endpoints to create, read, update, and delete vehicle records.

## Features

- Create a new vehicle
- Get all vehicles
- Get a specific vehicle by VIN
- Update a vehicle by VIN
- Delete a vehicle by VIN

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- dotenv
- Jest
- Supertest

## Setup

1. Clone the repository:
```bash
https://github.com/ZeelPatel1024/Apollo-Coding-Challange.git
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
MONGO_URL=your_mongodb_uri
PORT=your_port_number
```

4. Run the server:
```bash
npm start
```

5. Run tests:
```bash
npm test
```

## API Endpoints

- POST /api/vehicle: Create a new vehicle
- GET /api/vehicle: Get all vehicles
- GET /api/vehicle/:vin: Get a specific vehicle by VIN
- PUT /api/vehicle/:vin: Update a vehicle by VIN
- DELETE /api/vehicle/:vin: Delete a vehicle by VIN

## Error Handling

- 400 Bad Request: Invalid JSON
- 422 Unprocessable Entity: Missing fields or duplicate VIN
- 404 Not Found: Vehicle not found
- 500 Internal Server Error: Server error
