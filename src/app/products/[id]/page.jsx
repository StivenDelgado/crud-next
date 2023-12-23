import axios from "axios";
import Buttons from "./Buttons";

async function loadProducts(productId) {
  const { data } = await axios.get(
    `http://localhost:3000/api/products/${productId}`
  );
  return data;
}

async function ProductPage({ params }) {
  const product = await loadProducts(params.id);

  return (
    <section className="flex justify-center items-center text-black h-full">
      <div className="flex">
        <div className="p-6 bg-white text-center flex flex-col justify-center gap-4 ">
          <h3 className=" text-2xl font-bold mb-3">Name: {product[0].name}</h3>
          <h4 className="text-4xl">Price: {product[0].price}</h4>
          <p className="text-slate-600">
            Description: {product[0].description}
          </p>
          <Buttons productId={product[0].id} />
        </div>
        <img src={product[0].image} className="w-80 " alt="" />
      </div>
    </section>
  );
}

export default ProductPage;
