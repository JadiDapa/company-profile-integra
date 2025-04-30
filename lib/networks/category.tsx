import { CategoryType, CreateCategoryType } from "../types/category";
import { axiosInstance } from "../axiosInstance";

export async function getAllCategories() {
  const { data } = await axiosInstance.get<CategoryType[]>("/categories");
  return data;
}

export async function getActivityById(id: string) {
  const { data } = await axiosInstance.get<CategoryType>("/categories/" + id);
  return data;
}

export async function createActivity(values: CreateCategoryType) {
  const { data } = await axiosInstance.post("/categories", values);
  return data;
}

export async function updateActivity(id: string, values: CreateCategoryType) {
  const { data } = await axiosInstance.put("/categories/" + id, values);
  return data;
}

export async function deleteActivity(id: string) {
  const { data } = await axiosInstance.delete("/categories/" + id);
  return data;
}
