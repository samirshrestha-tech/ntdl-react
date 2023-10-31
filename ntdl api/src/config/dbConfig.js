import mongoose from "mongoose";
const mongoURL = "mongodb://127.0.0.1:27017/ntdl_db";

export const connectMongo = () => {
  try {
    const connect = mongoose.connect(mongoURL);
    connect && console.log("dbconnect");
  } catch (error) {
    console.log(error);
  }
};
