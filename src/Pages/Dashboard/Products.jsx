import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllProductsByUserAPI } from "../../Services/Operation/ProfileAPI";
import toast from "react-hot-toast";
import { LuEye, LuTrash2 } from "react-icons/lu";

function Products() {
  const { user, token } = useSelector((state) => state.auth);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  async function getAllProducts() {
    const toastId = toast.loading("Fetching products...");
    try {
      setLoading(true);
      const response = await getAllProductsByUserAPI(user.id, token);
      toast.dismiss(toastId);
      console.log("response", response);
      if (response.status === 200) {
        setProducts(response.data.data);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to fetch products");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  }

  // Placeholder API for deleting a product
  const handleDelete = async (productId) => {
    const toastId = toast.loading("Deleting product...");
    try {
      // Replace with actual deleteProductAPI
      console.log(`Deleting product ${productId}`);
      // Example: await deleteProductAPI(productId, token);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      toast.dismiss(toastId);
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Failed to delete product");
      console.error("Error deleting product:", error);
    }
  };

  console.log("products", products);

  useEffect(() => {
    getAllProducts();
  }, [user.id, token]);

  // Modal for product details
  const ProductDetailsModal = ({ product, onClose }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-60 transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full mx-4 transform scale-95 animate-pop-in">
        <style>
          {`
            @keyframes pop-in {
              0% { transform: scale(0.8); opacity: 0; }
              100% { transform: scale(1); opacity: 1; }
            }
            .animate-pop-in {
              animation: pop-in 0.3s ease-out forwards;
            }
          `}
        </style>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {product.productName}
        </h2>
        <div className="space-y-4">
          <img
            src={product.image}
            alt={product.productName}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div>
            <p>
              <strong>Price:</strong> ₹{product.price.toLocaleString()}
            </p>
            <p>
              <strong>Listed For:</strong>{" "}
              {product.listed_for.charAt(0).toUpperCase() +
                product.listed_for.slice(1)}
            </p>
            <p>
              <strong>Details:</strong> {product.details || "Not Provided"}
            </p>
            <p>
              <strong>Product ID:</strong> {product.id}
            </p>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Products</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={product.image}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {product.productName}
                </h2>
                <p className="text-gray-600 mt-1">
                  ₹{product.price.toLocaleString()}
                </p>
                <p className="text-gray-600 mt-1">
                  Listed for:{" "}
                  {product.listed_for.charAt(0).toUpperCase() +
                    product.listed_for.slice(1)}
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all duration-200 cursor-pointer"
                  >
                    <LuEye size={16} /> See More
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-200 cursor-pointer"
                  >
                    <LuTrash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

export default Products;
