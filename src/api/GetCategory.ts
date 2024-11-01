import { CategoriesList } from "../models/Category.model";

const getCategoryList = (): Promise<CategoriesList> => {
  return fetch("https://opentdb.com/api_category.php")
    .then((response) => response.json())
    .then((list) => list)
    .catch((err) => {
      console.error("Error fetching category list:", err);
      return null;
    });
};

export { getCategoryList };
