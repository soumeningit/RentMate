import React, { useEffect, useState } from "react";
import { getSellProductsAPI } from "../../Services/Operation/ProductAPI";
import { useSelector } from "react-redux";

function SellProducts() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { user, token } = useSelector((state) => state.auth);

  async function getSellProducts() {
    try {
      const response = await getSellProductsAPI(user.id, token);
      if (response.status === 200) {
        setProducts(response.data.products);
      }
    } catch (error) {
      console.error("Error in getSellProducts: ", error);
    }
  }

  useEffect(() => {
    getSellProducts();
  }, []);

  const totalPrice = products.reduce(
    (sum, product) => sum + parseFloat(product.calculated_price),
    0
  );

  const visibleProducts = products.slice(currentIndex, currentIndex + 3);

  const handleNext = () => {
    if (currentIndex + 3 < products.length) {
      setCurrentIndex(currentIndex + 3);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 flex">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Sold Products
        </h1> */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Sold Products</h1>
          <div className="text-right">
            <h2 className="text-lg font-semibold text-gray-700">
              Total Earnings
            </h2>
            <p className="text-2xl font-bold text-green-600">
              ₹{totalPrice.toFixed(2)}
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No sold products found.
          </p>
        ) : (
          <div className="relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
                >
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {product.productName}
                    </h2>
                    <p className="text-gray-600 mb-2">
                      <span className="font-medium">Buyer:</span>{" "}
                      {product.first_name} {product.last_name}
                    </p>
                    <p className="text-gray-600 mb-4">
                      <span className="font-medium">Price:</span> ₹
                      {product.calculated_price}
                    </p>
                    <button
                      onClick={() => openModal(product)}
                      className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                    >
                      Show More
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {products.length > 3 && (
              <div className="flex justify-between mt-6">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={`py-2 px-4 rounded-lg ${
                    currentIndex === 0
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } transition-all duration-300`}
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex + 3 >= products.length}
                  className={`py-2 px-4 rounded-lg ${
                    currentIndex + 3 >= products.length
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  } transition-all duration-300`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-lg w-full transform transition-all duration-300 scale-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {selectedProduct.productName}
              </h2>
              <img
                src={selectedProduct.productImage}
                alt={selectedProduct.productName}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Buyer:</span>{" "}
                {selectedProduct.first_name} {selectedProduct.last_name}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Price:</span> ₹
                {selectedProduct.calculated_price}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Quantity:</span>{" "}
                {selectedProduct.quantity}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Location:</span>{" "}
                {selectedProduct.productLocation}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Email:</span>{" "}
                <a href={`mailto:${selectedProduct.email}`}>
                  {selectedProduct.email}
                </a>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Contact:</span>{" "}
                <a href={`tel:${selectedProduct.contact_no}`}>
                  {selectedProduct.contact_no}
                </a>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Sold on:</span>{" "}
                {new Date(selectedProduct.sold_date).toLocaleDateString()}
              </p>
              <button
                onClick={closeModal}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg mt-4 transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellProducts;
