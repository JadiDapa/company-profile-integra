export interface CreateActivityType {
  title: string;
  category: string;
  content: string;
  slug: string;
  image: string | File;
}

export interface ActivityType extends CreateActivityType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
