import app from "./app.js";
import connectDatabase from "./src/config/databases/mongodb.js";
import { PORT } from "./src/config/config.js";

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
