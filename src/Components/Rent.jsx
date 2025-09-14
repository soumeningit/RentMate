import React, { useState, useEffect } from "react";
import CardComponent from "./CardComponent";
import { getAllRentProductsAPI } from "../Services/Operation/ProductAPI";

function Rent() {
  const [productDetails, setProductDetails] = useState([]);

  async function getAllRentProducts() {
    try {
      const response = await getAllRentProductsAPI();
      console.log("Response in all rent products : ", response);
      console.log("Response in all rent products : ", JSON.stringify(response));
      if (response.status === 200) {
        setProductDetails(response?.data?.products);
      }
    } catch (error) {
      console.log("Error : " + error);
    }
  }

  useEffect(() => {
    getAllRentProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10 mb-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Rent</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 rounded-lg bg-gray-100 shadow-md">
        {productDetails &&
          productDetails.map((item) => (
            <CardComponent
              key={item.product_id}
              id={item.product_id}
              name={item.product_name}
              description={item.descriptions}
              price={item.product_price}
              image={item.product_image_url}
              owner={item.first_name + " " + item.last_name}
              date={item.created_at}
              used_for={item.listed_for}
            />
          ))}
      </div>
    </div>
  );
}

export default Rent;
