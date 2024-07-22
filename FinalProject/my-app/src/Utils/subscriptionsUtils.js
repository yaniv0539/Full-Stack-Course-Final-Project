import axios from "axios";

const url = "http://localhost:8000/subscriptions";

export async function getSubscriptions() {
  const { data } = await axios.get(url);
  return data;
}

export async function getSubscriptionById(id) {
  const { data } = await axios.get(`${url}/${id}`);
  return data;
}

export async function addSubscription(newUser) {
  const { data } = await axios.post(url, newUser);
  return data;
}

export async function updateSubscription(id, newUser) {
  const result = await axios.put(`${url}/${id}`, newUser);
  return result;
}

export async function deleteSubscription(id) {
  const result = await axios.delete(`${url}/${id}`);
  return result;
}
