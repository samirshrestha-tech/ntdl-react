import Task_Schema from "./Task_Schema.js";

// CRUD
// create
export const insertTask = (taskObj) => {
  return Task_Schema(taskObj).save();
};

// READ
export const getAllTasks = () => {
  return Task_Schema.find();
};

// update

export const switchTask = (_id, data) => {
  return Task_Schema.findByIdAndUpdate(_id, data, { new: true });
};
// delete

// export const deleteTask = (_id) => {
//   return Task_Schema.findByIdAndDelete(_id);
// };

export const deleteManyTask = (ids) => {
  return Task_Schema.deleteMany({ _id: { $in: ids } });
};
