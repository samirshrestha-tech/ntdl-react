import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
  hr: {
    type: Number,
  },
  type: {
    type: String,
    default: "entry",
  },
});

// this converts into the model
// table name and the schema
export default mongoose.model("Task", taskSchema);
