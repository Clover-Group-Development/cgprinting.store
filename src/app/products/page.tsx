"use client";

import { IProduct } from "@/entities";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<Array<IProduct>>([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/products");
      console.log(data);
      setProducts(data);
    })();
  }, []);

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          <h1>{p.displayName}</h1>
          <p>{p.price}</p>
        </div>
      ))}
    </div>
  );
}
