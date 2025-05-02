import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.img || !newProduct.price) {
      return { success: false, message: "Please fill all the details" };
    }
    const res = await fetch("/apiv1/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
  fetchProducts: async () => {
    try {
      const res = await fetch("/apiv1/product");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();

      // Check if response is valid
      if (data.success && Array.isArray(data.products)) {
        set((state) => {
          // Only update the state if the products are different
          if (
            JSON.stringify(state.products) !== JSON.stringify(data.products)
          ) {
            return { products: data.products };
          }
          return {}; // Return nothing if products haven't changed
        });
      } else {
        console.error("Invalid response format:", data);
        set({ products: [] });
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ products: [] });
    }
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/apiv1/product/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return { success: false, message: data.message };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updateProduct) => {
    const res = await fetch(`/apiv1/product/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateProduct),
    });
    const data = await res.json();
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: "Product Updated" };
  },
}));
