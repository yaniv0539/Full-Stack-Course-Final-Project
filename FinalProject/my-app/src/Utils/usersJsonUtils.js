import axios from "axios";

const url = "http://localhost:8001/usersJson";

export async function usersJsonGetUsers() {
  const { data } = await axios.get(url);
  return data;
}

export async function usersJsonGetUsersById(id) {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
}

export async function usersJsonAddUser(newUser) {
  const result = await axios.post(url, newUser);
  return result;
}

export async function usersJsonUpdateUser(id, newUser) {
  console.log(newUser);
  const result = await axios.put(`${url}/${id}`, newUser);
  return result;
}

export async function usersJsonDeleteUser(id) {
  const result = await axios.delete(`${url}/${id}`);
  return result;
}
