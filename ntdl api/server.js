import express, { urlencoded } from "express";
import { connectMongo } from "./src/config/dbConfig.js";
import {
  deleteManyTask,
  getAllTasks,
  insertTask,
  switchTask,
} from "./src/model/Task_Model.js";

import cors from "cors";

const app = express();
const port = 8000;
let fakeDb = [];
connectMongo();
app.use(express.json());
app.use(cors());

app.get("/api/v1/task", async (req, res) => {
  const taskList = await getAllTasks();
  res.json({
    status: "success",
    message: "here are the task list",
    taskList,
  });
});

app.post("/api/v1/post", async (req, res) => {
  // fakeDb.push(req.body);
  const result = await insertTask(req.body);

  // console.log(req.body);
  result?._id
    ? res.json({
        status: "success",
        message: "new task has been added",
      })
    : res.json({
        status: "error",
        message: "sorry unable to add the task ",
      });
});

app.patch("/api/v1/patch", async (req, res) => {
  const { _id, type } = req.body;
  const result = await switchTask(_id, { type });
  console.log(result);

  result?._id
    ? res.json({
        status: "success",
        message: "updated",
      })
    : res.json({
        status: "error",
        message: "sorry  ",
      });
});
app.delete("/api/v1/delete/", async (req, res) => {
  const { ids } = req.body;
  const result = await deleteManyTask(ids);
  res.json({
    status: "success",
    message: "deleted",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

app.listen(port, (error) => {
  error
    ? console.log(error)
    : console.log("your server is running at http://localhost:" + port);
});
