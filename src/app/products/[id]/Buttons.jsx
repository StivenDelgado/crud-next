"use client"
import axios from "axios";
import { useRouter } from "next/navigation";


function Buttons({ productId }) {
  
  const router = useRouter();

  return (
    <div className="flex justify-around">
      <button className="bg-red-500 hover:bg-red-700 rounded py-2 px-3"
      onClick={async () => {
        if (confirm("Are you sure you want to delete this product ?")) {
          const res = await axios.delete(`/api/products/${productId}`);
          console.log(res)
          if (res.status === 200) {
            router.push("/products");
            router.refresh();
          }
        }
      }}>
        Delete
      </button>
      <button className="bg-gray-500 hover:bg-gray-700 rounded py-2 px-3"
      onClick={() => {
        router.push(`/products/edit/${productId}`);
      }}>
        Edit
      </button>
    </div>
  );
}

export default Buttons;
