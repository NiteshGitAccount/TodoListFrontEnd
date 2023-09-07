import axios from "axios";

export default axios.create({
  baseURL : "http://localhost:8000/",

  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});