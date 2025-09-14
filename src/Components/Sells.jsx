import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import { getAllSellProductsAPI } from "../Services/Operation/ProductAPI";

function Sell() {
  const [data, setData] = useState([]);

  const getAllSellProducts = async () => {
    try {
      const response = await getAllSellProductsAPI();
      if (response.status === 200) {
        setData(response?.data?.products);
      }
    } catch (error) {
      console.error("Error in getAllSellProducts: ", error);
    }
  };

  useEffect(() => {
    getAllSellProducts();
  }, []);

  return (
    <div className="container mx-auto mt-10 mb-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">Sell</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 rounded-lg bg-gray-100 shadow-md">
        {data &&
          data.map((item) => (
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

export default Sell;
