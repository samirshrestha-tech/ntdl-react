import { useEffect, useState } from "react";
import "./App.css";
import { deleteTTask, postData, updateTask } from "./helper/axiosHelper";
import { getTasks } from "./helper/axiosHelper";

const totalHrsPerWeek = 24 * 7;

function App() {
  const initialState = {
    task: "",
    hr: "",
  };
  const [form, setForm] = useState(initialState);
  const [taskList, setTaskList] = useState([]);
  const [resp, setResp] = useState({});
  const [idsToDelete, setIdsToDelete] = useState([]);
  const totalHrs = taskList.reduce((acc, item) => acc + +item.hr, 0);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    const data = await getTasks();
    console.log(data);
    data?.status === "success" && setTaskList(data.taskList);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (totalHrs + +form.hr > totalHrsPerWeek) {
      return alert("Sorry Boss not enough hours");
    }
    // const obj = {
    //   ...form,
    //   type: "entry",
    //   id: randomStr(),
    // };
    // setTaskList([...taskList, obj]);

    // instead of displraying with the use state we send the data to the db first and receive it again to display again
    const data = await postData(form);

    setResp(data);
    setForm(initialState);
    getdata();
  };
  // console.log(taskList);

  const handleOnDelete = async (id, task) => {
    if (window.confirm(`are you sure you want to delete ${task}`)) {
      //  calling api to delete the data
      const resp = await deleteTTask({ ids: idsToDelete });
      // fetching the api to pull the data
      getdata();
      // filter
    }
  };

  // const randomStr = () => {
  //   const charLength = 6;
  //   const str = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
  //   let id = "";

  //   for (let i = 0; i < charLength; i++) {
  //     const randNum = Math.round(Math.random() * (str.length - 1));
  //     id += str[randNum];
  //   }

  //   return id;
  // };
  const switchTask = async (obj) => {
    const response = await updateTask(obj);
    console.log("fafa");
    console.log(response);

    getdata();
    // const arg = taskList.map((item) => {
    //   if (item.id === _id) {
    //     return {
    //       ...item,
    //       type,
    //     };
    //   }
    //   return item;
    // });
    // setTaskList(arg);
  };

  const entry = taskList.filter((item) => item.type === "entry");
  const bad = taskList.filter((item) => item.type === "bad");
  const badHr = bad.reduce((acc, item) => acc + +item.hr, 0);

  const handleOnAllChecked = (e) => {};

  return (
    <div className="">
      <div class="wrapper">
        <div class="container">
          {/* <!-- top title  --> */}
          <div class="row g-2">
            <div class="col mt-5 text-center">
              <h1>Not to do list</h1>
            </div>
          </div>

          {resp?.message && (
            <div className="alert-success">{resp?.message}</div>
          )}

          {/* <!-- form  --> */}
          <form
            onSubmit={handleOnSubmit}
            class="mt-5 border p-5 rounded shadow-lg bg-transparent"
          >
            <div class="row g-2">
              <div class="col-md-6">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Coding.."
                  aria-label="First name"
                  name="task"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div class="col-md-3">
                <input
                  type="number"
                  min="1"
                  class="form-control"
                  placeholder="23"
                  aria-label="Last name"
                  name="hr"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div class="col-md-3">
                <div class="d-grid">
                  <button class="btn btn-primary">Add Task</button>
                </div>
              </div>
            </div>
          </form>

          {/* <!-- table area  --> */}
          <div class="row mt-5 pt-2">
            {/* <!-- 1. entry list --> */}

            <div class="col-md">
              <h3 class="text-center">Task Entry List</h3>
              <hr />
              <input
                class="form-check-input"
                type="checkbox"
                value="entry"
                id=""
              ></input>
              <label htmlFor=""> Select all entry list</label>
              <table class="table table-striped table-hover border opacity">
                <tbody id="entry">
                  {entry.map((item, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        {" "}
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                          ></input>
                        </div>
                      </td>

                      <td>{item.task}</td>
                      <td>{item.hr}hr</td>
                      <td class="text-end">
                        <button
                          onClick={() =>
                            switchTask({ _id: item._id, type: "bad" })
                          }
                          class="btn btn-success"
                        >
                          <i class="fa-solid fa-arrow-right"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* <!-- 2. bad list  --> */}
            <div class="col-md">
              <h3 class="text-center">Bad List</h3>
              <hr />
              <input
                class="form-check-input"
                type="checkbox"
                value="bad"
                id=""
              ></input>
              <label htmlFor=""> Select all bad list</label>
              <table class="table table-striped table-hover border opacity">
                <tbody id="bad">
                  {bad.map((item, i) => (
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        {" "}
                        <div className="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                          ></input>
                        </div>
                      </td>
                      <td>{item.task}</td>
                      <td>{item.hr}hr</td>
                      <td class="text-end">
                        <button
                          onClick={() =>
                            switchTask({ _id: item._id, type: "entry" })
                          }
                          class="btn btn-left"
                        >
                          <i class="fa-solid fa-arrow-left"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div class="alert alert-info">
                You could have save = <span id="badHr">{badHr}</span>hr
              </div>
            </div>
          </div>

          {/* <!-- toat time allocated --> */}
          <div class="alert alert-info">
            Total hrs per week allocated = <span id="totalHr">{totalHrs}</span>
            hr
          </div>
          <div className="delete d-grid mb-3">
            <button onClick={() => handleOnDelete()} class="btn btn-danger">
              <i class="fa-solid fa-trash"></i> Delete 3 tasks?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
