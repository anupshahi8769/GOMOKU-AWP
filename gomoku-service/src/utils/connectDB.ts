import mongoose from "mongoose";

const connectDB = async () => {
  const dbUri = "mongodb+srv://admin:admin@cluster0.nigswpn.mongodb.net/une-gomoku?retryWrites=true&w=majority";
  mongoose.set('strictQuery', false);
  console.log(`⚡️[server]: Connecting to DB...`);
  try {
    await mongoose.connect(dbUri);
  } catch (error) {
    console.log(`⚡️[server]: Could not connect to db`);
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
