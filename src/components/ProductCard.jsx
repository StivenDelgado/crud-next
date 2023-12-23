import Link from "next/link";
import React from "react";

function ProductCard({product}) {
  return (
    <Link
      className="bg-white rounded-lg border-gray-800 mb-3 text-black hover:shadow-xl hover:shadow-purple-600 hover:bg-gray-100 hover:cursor-pointer"
        href={`/products/${product.id}`}
    >
      {product.image && ( 
        <img
          className="w-full h-64 object-cover object-center rounded-t-lg shadow"
          src={product.image} />)}
           
      <div className="p-4">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <p className="text-2xl text-slate-600">{"$" + product.price}</p>
        <p>{product.description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
