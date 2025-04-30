import { GalleryType, CreateGalleryType } from "../types/gallery";
import { axiosInstance } from "../axiosInstance";

export async function getAllGalleries() {
  const { data } = await axiosInstance.get<GalleryType[]>("/galleries");
  return data;
}

export async function getGalleryById(id: string) {
  const { data } = await axiosInstance.get<GalleryType>("/galleries/" + id);
  return data;
}

export async function createGallery(values: CreateGalleryType) {
  const formData = new FormData();

  formData.append("title", values.title);
  formData.append("slug", values.slug);
  formData.append("image", values.image as File);

  const { data } = await axiosInstance.post("/galleries", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
}

export async function updateGallery(id: string, values: CreateGalleryType) {
  const { data } = await axiosInstance.put("/galleries/" + id, values);

  return data;
}

export async function deleteGallery(id: string) {
  const { data } = await axiosInstance.delete("/galleries/" + id);
  return data;
}
