Certainly! I've updated the README to include information about Express.js and MongoDB Atlas, and I replaced references to `yarn` with `npm`:

---

# Casa Blanca Bar & Restaurant - Admin

## Prerequisites

Ensure that you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or newer)
- [npm](https://www.npmjs.com/get-npm)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ipetersenpai/CasaBlanca-Admin
   ```

2. **Navigate to the project folder:**

   ```bash
   cd casablanca-admin
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   This will start the development server, and you can view your app at `http://localhost:3535`.

## MongoDB Atlas Configuration

1. Create a MongoDB Atlas account if you don't have one: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. Configure your MongoDB connection string in the project. You can find this in your MongoDB Atlas dashboard.

   Create a `.env` file in the project root:

   ```env
   MONGODB_URI=your_mongodb_uri_here
   ```

## Build for Production

To build the app for production, run:

```bash
npm run build
```

This will generate a `dist` folder with the optimized production build.

## Additional Commands

- **Lint your code:**

  ```bash
  npm run lint
  ```

- **Run tests:**

  ```bash
  npm test
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to customize it further based on the specific details and requirements of your project.
