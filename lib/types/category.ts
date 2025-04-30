export interface CreateCategoryType {
  name: string;
  slug: string;
}

export interface CategoryType extends CreateCategoryType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
