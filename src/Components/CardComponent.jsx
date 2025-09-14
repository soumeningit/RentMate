import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { IoIosAddCircleOutline, IoIosAddCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function CardComponent({
  id,
  name,
  description,
  price,
  image,
  owner,
  date,
  used_for,
}) {
  const navigate = useNavigate();

  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  const handleClick = (id, name) => {
    navigate(`/product-details/${used_for}/${name}/${id}`);
  };

  return (
    <div
      onClick={() => handleClick(id, name)}
      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 transform hover:scale-105 cursor-pointer"
    >
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-gray-800 truncate">{name}</h2>
          <button onClick={() => setLiked(!liked)}>
            {liked ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-400" />
            )}
          </button>
        </div>
        {Array.isArray(description) &&
          description.map((desc, index) => {
            return (
              <p
                key={index}
                className="text-gray-600 text-sm line-clamp-2 mb-3"
              >
                {desc}
              </p>
            );
          })}

        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span>Owner: {owner}</span>
          <span>{date}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-indigo-600 font-semibold text-lg">
            ₹{price}
          </span>
          <button onClick={() => setAdded(!added)}>
            {added ? (
              <IoIosAddCircle className="text-green-500 text-2xl" />
            ) : (
              <IoIosAddCircleOutline className="text-gray-400 text-2xl" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
