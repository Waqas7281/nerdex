import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";


const BASE_URL =import.meta.env.MODE==="development"? "http://localhost:3000": ""; // Your API base URL

export const useProductStore = create((set, get) => ({
  product: [],
  loading: false,
  error: null,
  currentProduct: null,

  formData: {
    name: "",
    price: "",
    image: ""
  },

  studentData: null,

  setFormData: (formData) => set({ formData }),
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  setStudentData: (data) => set({ studentData: data }),


  addProduct: async (e) => {
    e.preventDefault(); // Prevent form submission
    set({ loading: true });
    try {
      const formData = get().formData;
      await axios.post(`${BASE_URL}/api/products/`, formData);
      await get().fetchProducts();  // Fetch updated products
      get().resetForm();
      toast.success('Product add successfully')
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/`);
      set({ product: response.data.data, error: null });
    } catch (err) {
      set({ error: err.message || "Something went wrong", product: [] });
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true });
    try {
      // Attempting to delete the product from the backend
      await axios.delete(`${BASE_URL}/api/products/${id}`);
      
      // Optimistically update the store by removing the deleted product
      set((prev) => ({
        product: prev.product.filter((product) => product.id !== id),
      }));
  
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error("Error in delete function", error); // Log full error for debugging
  
      // Provide a more specific error message if available
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      
      toast.error(`Error: ${errorMessage}`);
    } finally {
      set({ loading: false });
    }
  },

  fetchProduct: async (id) => {
    set({ loading: true }); // Set loading to true
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      const productData = response.data; // Extract the product data
  
      // Update the state with the fetched product data
      set((state) => ({
        ...state, // Preserve the existing state
        currentProduct: productData, // Set the fetched product data
        formData: productData, // Prefill the form data with the fetched product data
      }));
    } catch (error) {
      console.error("Error in fetchProduct function", error);
      toast.error("Something went wrong"); // Show an error toast
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },
  updateProduct: async (id)=>{
    set({loading: true});
    try {
      const {formData}=get();
      const response= await axios.put(`${BASE_URL}/products/${id}`,formData
      );
      set({currentProduct:response.data.data});
      toast.success("product updated successfully");
    } catch (error) {
      toast.error("somthing went wrong");
      console.log("Error in updateProduct function",error)
    }
    finally{
      set({loading: false});
    }
  },

  addStudent: async (data) => {
    set({ loading: true });
    try {
      console.log("Student data to be added:", data);
      
      // Use the `data` passed into the function, not `get().data`
      await axios.post(`${BASE_URL}/api/products/user`, data);
  
      // Optionally, fetch updated products if necessary
      await get().fetchProducts();
  
      // Reset form after successful submission
      get().resetForm();
  
      toast.success('Student added successfully');
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },
  
}));
