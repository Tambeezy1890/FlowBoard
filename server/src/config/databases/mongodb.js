import mongoose from "mongoose";

const connectDatabase = async (DB_URI) => {
  try {
    const connect = await mongoose.connect(DB_URI);
    if (connect) {
      console.log("Database connected" + connect.connection.host);
    }
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  }
};

export default connectDatabase;
