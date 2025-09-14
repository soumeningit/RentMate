import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiFillCloseCircle } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  createProductAPI,
  getAllCategoriesAPI,
} from "../Services/Operation/ProductAPI";
import Modal from "../Components/Modal";
import toast from "react-hot-toast";

function CreateProduct() {
  const [productData, setProductData] = useState({
    productName: "",
    details: "",
    productPrice: "",
    categoryId: "",
    listedFor: "",
    userId: "",
    description: [],
    productImage: null,
    productLocation: "",
    rentPrice: "",
    rentDuration: "",
    flag: "",
    available: "",
    quantity: 1,
  });

  const [categories, setCategories] = useState([]);

  const [newDescription, setNewDescription] = useState("");

  const [showModal, setShowModal] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const location = useLocation();

  const userId = user?.id;

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await getAllCategoriesAPI(token);

        if (response.status === 200) {
          setCategories(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === "productDeatails") {
      const wordCount = value.trim().split(/\s+/).length;
      if (wordCount > 1000) {
        alert("Product details should not exceed 1000 words.");
        return;
      }
    }

    setProductData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddDescription = () => {
    if (newDescription.trim()) {
      setProductData((prevData) => ({
        ...prevData,
        description: [...prevData.description, newDescription],
      }));
      setNewDescription("");
    }
  };

  const handleRemoveDescription = (index) => {
    const updatedDescriptions = [...productData.description];
    updatedDescriptions.splice(index, 1);
    setProductData((prevData) => ({
      ...prevData,
      description: updatedDescriptions,
    }));
  };

  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setProductData((prevData) => ({
      ...prevData,
      productImage: file,
    }));
    setPreviewUrl(URL.createObjectURL(file)); // for preview
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productName", productData.productName);
    formData.append("productPrice", productData.productPrice);
    formData.append("description", JSON.stringify(productData.description));
    formData.append("image", productData.productImage);
    formData.append("categoryId", productData.categoryId);
    formData.append("details", productData.details);
    formData.append("listedFor", productData.listedFor);
    formData.append("userId", userId);
    formData.append("location", productData.productLocation);
    formData.append("rentPrice", productData.rentPrice);
    formData.append("rentDuration", productData.rentDuration);
    formData.append("flag", productData.flag);
    formData.append("available", productData.available);
    formData.append("quantity", productData.quantity);

    const toastId = toast.loading("Creating product...");
    try {
      const response = await createProductAPI(formData, token);
      toast.dismiss(toastId);
      if (response.status === 401) {
        setShowModal(true);
        return;
      }

      if (response.status === 200) {
        toast.success("Product created successfully!");
        setProductData({
          productName: "",
          details: "",
          productPrice: "",
          categoryId: "",
          listedFor: "",
          userId: "",
          description: [],
          productImage: null,
          productLocation: "",
        });
        setPreviewUrl(null);
        navigate("/dashboard/my-profile");
      }
    } catch (error) {
      toast.dismiss(toastId);
      if (error.response.status === 401) {
        setShowModal(true);
        return;
      }
      console.error("Error submitting form:", error);
    } finally {
      toast.dismiss(toastId);
    }
  }

  useEffect(() => {
    setProductData((prev) => ({
      ...prev,
      flag: location.pathname.includes("sell") ? "sell" : "rent",
    }));
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          {location.pathname.includes("sell") ? (
            <span>Sell Your Product</span>
          ) : (
            <span>Rent Your Product</span>
          )}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Product Name</label>
            <input
              type="text"
              id="productName"
              value={productData.productName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-2 focus:outline-indigo-500"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Select the Purpose</label>
            <select
              id="listedFor"
              value={productData.listedFor}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select an option</option>
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </select>
          </div>
          {productData.listedFor === "sell" && (
            <div>
              <label className="block font-medium mb-1">Product Price</label>
              <input
                type="number"
                id="productPrice"
                value={productData.productPrice}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-4 py-2 focus:outline-indigo-500"
              />
            </div>
          )}

          <div>
            <label className="block font-medium mb-1">
              Product Description
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="flex-1 border rounded-lg px-4 py-2"
                placeholder="Add a short point..."
              />
              <button
                type="button"
                onClick={handleAddDescription}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 cursor-pointer"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-2">
              {productData.description.map((desc, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-lg"
                >
                  <span>{desc}</span>
                  <AiFillCloseCircle
                    onClick={() => handleRemoveDescription(index)}
                    className="text-red-500 cursor-pointer"
                  />
                </li>
              ))}
            </ul>
          </div>

          <div>
            <label className="block font-medium mb-1">Product Image</label>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-300 px-6 py-8 text-center rounded-lg cursor-pointer bg-gray-50"
            >
              <input {...getInputProps()} />
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="mx-auto h-48 object-cover rounded-md cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl(null);
                      setProductData((prev) => ({
                        ...prev,
                        productImage: null,
                      }));
                    }}
                    className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-lg hover:bg-red-100 transition cursor-pointer"
                  >
                    <AiFillCloseCircle className="text-red-600 text-xl cursor-pointer" />
                  </button>
                </div>
              ) : (
                <p className="text-gray-400">
                  Drag & drop or click to upload an image
                </p>
              )}
              <p className="text-gray-500 mt-2">
                (Max file size: 2MB, accepted formats: JPG, PNG)
              </p>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Product Details</label>
            <textarea
              id="details"
              value={productData.details}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter product details... Not more than 1000 words"
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1">Choose Category</label>
            <select
              id="categoryId"
              value={productData.categoryId}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category.id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              id="productLocation"
              value={productData.productLocation}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
          {productData.listedFor === "rent" && (
            <div>
              <label className="block font-medium mb-1">Rent Price</label>
              <input
                type="number"
                id="rentPrice"
                value={productData.rentPrice}
                onChange={handleChange}
                placeholder="Rent Price will be in per hour"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          )}
          {productData.listedFor === "sell" && (
            <div>
              <label className="block font-medium mb-1">Quantity:</label>
              <input
                type="number"
                id="quantity"
                value={productData.quantity}
                onChange={handleChange}
                placeholder="How many items you have"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          )}
          {productData.listedFor === "rent" && (
            <div>
              <label className="block font-medium mb-1">Rent Duration</label>
              <input
                type="text"
                id="rentDuration"
                value={productData.rentDuration}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          )}
          {productData.listedFor === "rent" && (
            <div>
              <label className="block font-medium mb-1">Available From: </label>
              <input
                type="date"
                id="available"
                value={productData.available}
                onChange={handleChange}
                required
                placeholder="Available From"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
          >
            Submit Product
          </button>
        </form>
      </div>
      {showModal && (
        <Modal
          btn1="Verify"
          btn2="Cancel"
          heading="Verify your account"
          text="You need to verify your account before creating a product. Do you want to verify now?"
          onConfirm={() => {
            setShowModal(false);
            navigate("/dashboard/verify_user");
          }}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default CreateProduct;
