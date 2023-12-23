"use client";
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
  });
  const [file, setFile] = useState(null);

  const form = useRef(null);
  const Router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/products/${params.id}`).then((res) => {
        setProduct({
          name: res.data[0].name,
          price: res.data[0].price,
          description: res.data[0].description,
        });
      });
    }
  }, []);
  const handleChange = (e) => {
    console.log(e.target.value);
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    if (file) {
      formData.append("image", file);
    }
    if (!params.id) {
      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } else {
      const res = await axios.put("/api/products/" + params.id, product, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
    }

    form.current.reset();
    Router.refresh();
    Router.push("/products");
  };
  return (
    <div className="flex">
      <form
        className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4 text-white"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label
          htmlFor="name"
          className="block text-gray-700 font-bold text-sm mb-2"
        >
          Product Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoFocus
          placeholder="nombre"
          onChange={handleChange}
          value={product.name}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black "
        />
        <label
          htmlFor="price"
          className="block text-gray-700 font-bold text-sm mb-2"
        >
          Product Price
        </label>
        <input
          type="number"
          name="price"
          id="price"
          placeholder="0.00"
          onChange={handleChange}
          value={product.price}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        />
        <label
          htmlFor="description"
          className="block text-gray-700 font-bold text-sm mb-2"
        >
          Product Description
        </label>
        <textarea
          rows={3}
          type="text"
          name="description"
          id="description"
          placeholder="descripcion"
          onChange={handleChange}
          value={product.description}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
        />
        <label
          htmlFor="image"
          className="block text-gray-700 font-bold text-sm mb-2"
        >
          Product Image
        </label>
        <input
          type="file"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-5"
          src=""
          alt=""
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        {file && (
          <img
            className="w-80 my-4 object-contain mx-auto"
            src={URL.createObjectURL(file)}
            alt=""
          />
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {params.id ? "Update Product" : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
