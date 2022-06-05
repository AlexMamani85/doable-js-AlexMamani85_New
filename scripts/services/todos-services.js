import apiFetch from "./api-fetch.js";


export function getTodos() {
  return apiFetch("tasks")
}

export function createTodo(valuesTodo) {
  return apiFetch("tasks", { body: valuesTodo })
}

export function updateTodo(id,valuesTodo) {
  return apiFetch("tasks/"+id, { method: "PATCH", body: valuesTodo })
}
