import axios from "axios";

const url = "http://localhost:8000/members";

export async function getMembers() {
  const { data } = await axios.get(url);
  return data;
}

export async function getMemberById(id) {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
}

export async function addMember(newUser) {
  const { data } = await axios.post(url, newUser);
  return data;
}

export async function updateMember(id, newUser) {
  const result = await axios.put(`${url}/${id}`, newUser);
  return result;
}

export async function deleteMember(id) {
  const result = await axios.delete(`${url}/${id}`);
  return result;
}
