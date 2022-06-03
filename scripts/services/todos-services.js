import apiFetch from "./api-fetch.js";

export function getCategories() {
  return apiFetch("categories")
}

export function getTodos() {
  return apiFetch("tasks")
}

export function createCategory(newCategory = { name, transaction_type }){
  return apiFetch("categories", { body: newCategory })
}

export function deleteCategory(id) {
  return apiFetch("categories/" + id, { method: "DELETE" });
}