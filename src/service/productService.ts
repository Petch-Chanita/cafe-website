// services/productService.ts
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;



export const getProduct = async () => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");
    
    throw new Error("No authentication token found.");
  }


  try {
    const response = await axios.get(`${API_BASE_URL}/product/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.data) {
      console.log("Response Data:", response.data);
      return response.data; 
    } else {
      console.error("No data received");
      return null; 
    }
  } catch (error) {
    console.error("Error:", error);
    return null; 
  }
};

export const createProduct = async (product:any) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");
    
    throw new Error("No authentication token found.");
  }


  try {
    const response = await axios.post(`${API_BASE_URL}/product/`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: product
    });

    if (response.data) {
      console.log("Response Data:", response.data);
      return response.data; 
    } else {
      console.error("No data received");
      return null; 
    }
  } catch (error) {
    console.error("Error:", error);
    return null; 
  }
};

export const getCategory = async () => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");
    
    throw new Error("No authentication token found.");
  }


  try {
    const response = await axios.get(`${API_BASE_URL}/product/category`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.data) {
      console.log("Response Data:", response.data);
      return response.data; 
    } else {
      console.error("No data received");
      return null; 
    }
  } catch (error) {
    console.error("Error:", error);
    return null; 
  }
};

export const createCategory = async (data:any) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");
    
    throw new Error("No authentication token found.");
  }


  try {
    const response = await axios.post(`${API_BASE_URL}/product/category`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: data
    });

    if (response.data) {
      console.log("Response Data:", response.data);
      return response.data; 
    } else {
      console.error("No data received");
      return null; 
    }
  } catch (error) {
    console.error("Error:", error);
    return null; 
  }
};
