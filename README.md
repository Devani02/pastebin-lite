# Pastebin Lite

A lightweight Pastebin-like web application that allows users to store and share text content using a unique link, with optional expiration based on time or number of views.

---

## 🚀 Deployed Application
Live URL:  
https://pastebin-lite-mauve-mu.vercel.app/

---

## 🧑‍💻 How to Run Locally

### Prerequisites
- Node.js (v18 or later)
- npm
- PostgreSQL database (Neon or any Postgres instance)

### Steps
1. Clone the repository:
   ```bash
   git clone <your-github-repo-url>
   cd pastebin-lite

2. Install dependencies:
    ```bash
    npm install

3. Create a .env file in the root directory and add:
    ```bash
    DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"


4. Run database migrations:
    ```bash
    npx prisma migrate dev


5. Start the development server:
    ```bash
    npm run dev


6. Open:
    ```bash
    http://localhost:3000