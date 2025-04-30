import { ActivityType, CreateActivityType } from "../types/activity";
import { axiosInstance } from "../axiosInstance";

export async function getAllActivities() {
  const { data } = await axiosInstance.get<ActivityType[]>("/activities");
  return data;
}

export async function getActivityBySlug(slug: string) {
  const { data } = await axiosInstance.get<ActivityType>("/activities/" + slug);
  return data;
}

export async function createActivity(values: CreateActivityType) {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("slug", values.slug);
  formData.append("content", values.content);
  formData.append("category", values.category);
  formData.append("image", values.image as File);

  const { data } = await axiosInstance.post("/activities", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateActivity(id: string, values: CreateActivityType) {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("slug", values.slug);
  formData.append("content", values.content);
  formData.append("category", values.category);
  formData.append("image", values.image as File);

  const { data } = await axiosInstance.put("/activities/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function deleteActivity(id: string) {
  const { data } = await axiosInstance.delete("/activities/" + id);
  return data;
}
