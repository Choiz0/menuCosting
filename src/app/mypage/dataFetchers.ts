import axios from "axios";
import {Recipe} from "../types";

export const fetchUserRecipes = async (userId: string): Promise<Recipe[]> => {
    try {
      const response = await axios.get(`/api/recipes?userId=${userId}`);
      if (response.status === 200) {
        return response.data.data;
      } else {
        console.error("Error fetching user recipes:", response.data.error);
        throw new Error(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching user recipes:", error);
      throw error;
    }
  };