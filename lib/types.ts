/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Category {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

export interface AllBlogsHeaderProps {
  onCategoryChange?: (category: Category, filteredItems: any[]) => void;
}

export interface FeatureCardProps {
  id?: number | string;
  image: string;
  tagLabel?: string;
  category?: string;
  tagColor?: string;
  title: string;
  description: string;
  date: string;
  readTime?: string;
  slug: string;
  author?: string;
  authorImage?: string;
  className?: string;
  tips: string;
  layout?: "vertical" | "horizontal-left" | "horizontal-right";
  showSocialIcons?: boolean;
}

// bakery types start here
export type ProductItem = {
  title?: string;
  image?: string;
};

export type MenuProductItems = {
  title?: string;
  image?: string;
  price?: number;
  tagLabel?: string;
  description: string;
};

export type ButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export type MenuProductsItemsCardProps = {
  product: MenuProductItems;
};
