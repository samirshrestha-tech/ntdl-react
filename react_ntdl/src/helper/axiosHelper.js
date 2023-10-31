import axios from "axios";
const apiEndPoint = "http://localhost:8000/api/v1/post";
const getApi = "http://localhost:8000/api/v1/task";
const patchApi = "http://localhost:8000/api/v1/patch";
const deleteApi = "http://localhost:8000/api/v1/delete";
export const postData = async (obj) => {
  try {
    const { data } = await axios.post(apiEndPoint, obj);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTasks = async () => {
  try {
    const { data } = await axios.get(getApi);

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const updateTask = async (obj) => {
  try {
    const { data } = await axios.patch(patchApi, obj);

    return data;
  } catch (error) {
    console.log(error);
  }
};
export const deleteTTask = async (id) => {
  try {
    const { data } = await axios.delete(deleteApi, { data: id });
    return data;
  } catch (error) {
    console.log(error);
  }
};
