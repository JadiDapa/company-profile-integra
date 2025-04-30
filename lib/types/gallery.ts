export interface CreateGalleryType {
  title: string;
  slug: string;
  image: string | File;
}

export interface GalleryType extends CreateGalleryType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
