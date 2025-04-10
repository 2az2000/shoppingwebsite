"use client";
import axios from "axios";
import React, { useState } from "react";

export default function Dashboard() {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
  });
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  }
  function handleCreateProduct() {
    axios({
      method: "POST",
      url: "http://localhost:4000/product",
      data: {
        id: Math.floor(Math.random() * 1000),
        title: newProduct.title,
        price: newProduct.price,
        image: newProduct.image,
        description: newProduct.description,
      },
    });
  }
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-5">Dashboard</h1>
      <div className="flex flex-col gap-2 w-1/2 mx-auto">
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          placeholder="title"
          name="title"
          onChange={handleChange}
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          placeholder="price"
          name="price"
          onChange={handleChange}
        />
        <input
          className="border-2 border-gray-300 rounded-md p-2"
          type="text"
          placeholder="image"
          name="image"
          onChange={handleChange}
        />
        <textarea
          className="border-2 border-gray-300 rounded-md p-2"
          onChange={handleChange}
          placeholder="description"
          name="description"
        />
        <button
          className="bg-blue-500 text-white rounded-md p-2"
          onClick={handleCreateProduct}
        >
          Add
        </button>
      </div>
    </div>
  );
}
