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
    throw error;
  }
};

export const getProductById = async (id: string) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");

    throw new Error("No authentication token found.");
  }


  try {
    const response = await axios.get(`${API_BASE_URL}/product/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    });

    if (response.data) {
      // console.log("Response Data:", response.data);
      return response.data;
    } else {
      console.error("No data received");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const createProduct = async (product: any) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");

    throw new Error("No authentication token found.");
  }


  try {
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);
    formData.append("status", product.status);
    formData.append("description", product.description);
    formData.append("cafe_id", product.cafe_id);

    if (product.image_file) {
      formData.append("image", product.image_file);
    }

    const response = await axios.post(`${API_BASE_URL}/product/`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
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
    throw error;
  }
};
export const updateProduct = async (id: string, product: any) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");

    throw new Error("No authentication token found.");
  }


  try {

    if (!id) return;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("category_id", product.category_id);
    formData.append("status", product.status);
    formData.append("description", product.description);
    formData.append("cafe_id", product.cafe_id);

    if (product.image_file) {
      formData.append("image", product.image_file);
    }else {
      formData.append("image_url", product.image_url);
    }

    const response = await axios.post(`${API_BASE_URL}/product/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
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
    throw error;
  }
};


export const deleteProduct = async (ids: string[]) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");

    throw new Error("No authentication token found.");
  }


  try {

    const res = await axios.delete(`${API_BASE_URL}/product/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      data: { ids },

    });

    console.log("res", res);

    if (res.status !== 200) {
      throw new Error("Delete failed");
    }

    return res.data;

  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

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
    throw error;
  }
};

export const createCategory = async (data: any) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    console.log("No token");

    throw new Error("No authentication token found.");
  }


  try {
    const response = await axios.post(`${API_BASE_URL}/product/category`,
      data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });

    if (response) {
      console.log("Response Data:", response);
      return response.data;
    } else {
      console.error("No data received");
      return null;
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
