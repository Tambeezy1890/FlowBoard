import app from "./app.js";
import connectDatabase from "./src/config/databases/mongodb.js";
import { DB_URI, PORT } from "./src/config/config.js";

const startServer = async () => {
  try {
    await connectDatabase(DB_URI);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
