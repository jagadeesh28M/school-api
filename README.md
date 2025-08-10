# 🏫 School Management API

- A simple RESTful API built with **Node.js**, **Express**, **PostgreSQL**, **Prisma**, and **Zod** to manage school data.
- The API allows users to **add schools** and **retrieve a list of schools** sorted by proximity to a user-specified location.

## ✨ Features

- 🏗️ **CRUD Operations**: Add and retrieve schools with comprehensive data
- 📍 **Location Intelligence**: Sort schools by proximity to user coordinates
- 🛡️ **Data Validation**: Robust input validation using Zod schemas
- 🗄️ **Modern Database**: Prisma ORM with PostgreSQL for type-safe operations
- 🧪 **API Testing**: Complete Postman collection included
- 🚀 **Production Ready**: Hosted on Render with automatic deployments
- 📱 **RESTful Design**: Clean, intuitive API endpoints

## 🌐 Live Demo

**API Base URL:** [https://schoolapi-s9cm.onrender.com](https://schoolapi-s9cm.onrender.com)

**Status:** 🟢 Online

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/school-api.git
   cd school-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment setup**

   ```bash
   cp .env.example .env
   ```

   Update `.env` with your database credentials:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/school_db"
   PORT=3000
   NODE_ENV=development
   ```

4. **Database initialization**

   ```bash
   npx prisma migrate dev --name init
   npx prisma generate
   ```

5. **Start the server**
   ```bash
   npm start
   # or
   node index.js
   ```

The API will be available at `http://localhost:3000`

---

## 📚 API Reference

### Base URL

```
https://schoolapi-s9cm.onrender.com
```

### Endpoints

#### 🏫 Add School

```http
POST /addSchool
Content-Type: application/json
```

**Request Body:**

```json
{
  "name": "Greenwood High School",
  "address": "Sector 5, New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.209
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "name": "Greenwood High School",
  "address": "Sector 5, New Delhi, India",
  "latitude": 28.6139,
  "longitude": 77.209,
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

#### 📍 List Schools (Sorted by Distance)

```http
GET /listSchools?latitude=28.6&longitude=77.2
```

**Query Parameters:**

- `latitude` (required): User's latitude coordinate
- `longitude` (required): User's longitude coordinate

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Greenwood High School",
    "address": "Sector 5, New Delhi, India",
    "latitude": 28.6139,
    "longitude": 77.209,
    "distance": 1.56,
    "createdAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 🏗️ Project Structure

```
school-api/
├── 📁 prisma/                 # Database schema & migrations
│   ├── schema.prisma         # Prisma schema definition
│   └── migrations/           # Database migration files
├── 📁 validators/            # Input validation schemas
│   └── school.js            # Zod validation for school data
├── 📁 generated/             # Auto-generated files
├── 📄 .env                   # Environment variables (not committed)
├── 📄 .env.example          # Environment template
├── 📄 index.js              # Express server & route definitions
├── 📄 package.json           # Dependencies & scripts
├── 📄 README.md              # This file
└── 📄 SchoolAPI.postman_collection.json  # API testing collection
```

---

## 🧪 Testing

### Postman Collection

Import the included Postman collection for easy API testing:

- 📁 `SchoolAPI.postman_collection.json`

### Manual Testing

```bash
# Test adding a school
curl -X POST https://schoolapi-s9cm.onrender.com/addSchool \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test School",
    "address": "123 Test Street",
    "latitude": 28.6139,
    "longitude": 77.2090
  }'

# Test listing schools
curl "https://schoolapi-s9cm.onrender.com/listSchools?latitude=28.6&longitude=77.2"
```

---

## 🛠️ Tech Stack

| Component      | Technology | Version   |
| -------------- | ---------- | --------- |
| **Runtime**    | Node.js    | 18+       |
| **Framework**  | Express.js | 4.18+     |
| **Database**   | PostgreSQL | 14+       |
| **ORM**        | Prisma     | 5+        |
| **Validation** | Zod        | Latest    |
| **Hosting**    | Render     | Free Tier |
| **Testing**    | Postman    | -         |

---

## 🔧 Development

### Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server (if configured)
npm run build      # Build for production (if configured)
```

### Database Operations

```bash
npx prisma studio          # Open Prisma Studio
npx prisma migrate dev     # Create & apply migrations
npx prisma generate        # Generate Prisma client
npx prisma db push         # Push schema changes
```

---

## 📝 Environment Variables

| Variable       | Description                  | Required | Default     |
| -------------- | ---------------------------- | -------- | ----------- |
| `DATABASE_URL` | PostgreSQL connection string | ✅       | -           |
| `PORT`         | Server port                  | ❌       | 3000        |
| `NODE_ENV`     | Environment mode             | ❌       | development |

---
