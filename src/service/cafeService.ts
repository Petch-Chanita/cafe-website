// services/cafeService.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getCafeData = async (cafeId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/cafe/${cafeId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch cafe data");
  }
};

export const checkImageValid = async (imageUrl: string) => {
  try {
    await axios.get(imageUrl, { responseType: "arraybuffer" });
    return true;
  } catch {
    return false;
  }
};

export const getAboutByCafeID = async (cafeId: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/abouts/${cafeId}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch about data");
  }
};
