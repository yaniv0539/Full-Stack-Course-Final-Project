import axios from "axios";

const url = "http://localhost:8001/permissionsJson";

export async function permissionsJsonGetUsers() {
  const { data } = await axios.get(url);
  return data;
}

export async function permissionsJsonGetUsersById(id) {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
}

export async function permissionsJsonAddUser(newUser) {
  const result = await axios.post(url, newUser);
  return result;
}

export async function permissionsJsonUpdateUser(id, newUser) {
  const result = await axios.put(`${url}/${id}`, newUser);
  return result;
}

export async function permissionsJsonDeleteUser(id) {
  const result = await axios.delete(`${url}/${id}`);
  return result;
}
