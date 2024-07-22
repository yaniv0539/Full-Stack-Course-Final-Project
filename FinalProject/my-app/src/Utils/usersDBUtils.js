import axios from "axios";

const url = "http://localhost:8001/usersDB";

export async function usersDBGetUsers() {
  const { data } = await axios.get(url);
  return data;
}

export async function usersDBGetUserById(id) {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
}

export async function usersDBAddUser(newUser) {
  const { data } = await axios.post(url, newUser);
  return data;
}

export async function usersDBUpdateUser(id, newUser) {
  const result = await axios.put(`${url}/${id}`, newUser);
  return result;
}

export async function usersDBDeleteUser(id) {
  const result = await axios.delete(`${url}/${id}`);
  return result;
}
