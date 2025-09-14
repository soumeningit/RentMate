import React from "react";
import { AiTwotoneDelete } from "react-icons/ai";

function CartPage() {
  const dumyData = [
    {
      id: 1,
      name: "Product 1",
      description: "Description for Product 1",
      price: "1000000",
      image:
        "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600",
      owner: "John Doe",
      date: "2023-10-01",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "New York, USA",
      category: ["Electronics", "Gadgets", "Accessories"],
      ownerId: "1",
      ownerContact: "1234567890",
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description for Product 2",
      price: "20",
      image:
        "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=600",
      owner: "Jane Smith",
      date: "2023-10-02",
      details:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      location: "Los Angeles, USA",
      category: ["Fashion", "Clothing"],
      ownerId: "2",
      ownerContact: "9876543210",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-10 text-gray-800">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6">My Cart</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Items */}
        <div className="w-full lg:w-3/5 space-y-6">
          {dumyData.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-xl p-5 flex items-center gap-6 hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-32 h-32 object-cover rounded-lg"
              />
              <div className="flex-1 space-y-1">
                <h2 className="text-xl font-semibold text-indigo-700">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-sm font-medium">Price: ₹{product.price}</p>
              </div>
              <button className="bg-red-200 rounded-full text-red-500 hover:text-red-700 hover:bg-red-400 text-2xl cursor-pointer">
                <AiTwotoneDelete className="px-2 py-1 text-4xl text-clip" />
              </button>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-bold text-indigo-600 mb-4">
              Order Summary
            </h2>
            <p className="text-gray-700 text-md mb-6">
              Total Price: ₹
              <span className="font-semibold">
                {dumyData.reduce(
                  (acc, product) => acc + parseInt(product.price),
                  0
                )}
              </span>
            </p>
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg text-lg font-medium transition cursor-pointer">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
