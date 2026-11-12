## Local MongoDB setup

This setup was verified locally using `shelf_life_dev` as the development database.

1. Start your local MongoDB server.
2. In MongoDB Compass, connect to `mongodb://127.0.0.1:27017`.
3. Create a database named `shelf_life_dev` with `Users` as its first collection. Inside that database, create `Books` and `Borrowing` as well. If the database already exists, create only the missing collections.
4. Create a `.env` file in `backend/backend`, next to `package.json`, and add:

   ```dotenv
   MONGODB_URI=mongodb://127.0.0.1:27017/shelf_life_dev
   ```

5. From `backend/backend`, run `npm install` and then `npm run dev`. The terminal should show `MongoDB connected` before the API startup message.
6. Open `/api/health` in your browser using the port printed in the terminal. The API should return `success: true`.

Keep `.env` out of Git.

