import axios from "axios";
// const baseUrl = "http://localhost:3001/api/persons";
// const baseUrl = "https://fullstack-open-lhoy.onrender.com/api/persons";
const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    // const nonExisting = {
    //     id: 10000,
    //     name: "This note is not saved to server",
    //     number: "xxx-xxx-xxxx",
    // };
    // return request.then((response) => response.data.concat(nonExisting));
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const deleteObject = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => response.data);
};

export default {
    getAll,
    create,
    update,
    deleteObject,
};
