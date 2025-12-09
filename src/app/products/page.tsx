"use client";

import { IProduct } from "@/entities";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [model, setModel] = useState<IProduct>();
  const inputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/products");
      console.log(data);
      setProducts(data);
    })();
  }, []);

  const updateModel = () => {
    const { value: displayName } = inputRef.current!;
    const { value: price } = priceInputRef.current!;

    setModel({
      displayName,
      price: Number(price),
      images: [
        {
          id: crypto.randomUUID(),
          displayName: "Front",
        },
      ],
    } as IProduct);
  };

  const createProduct = async () => {
    await axios.post("/api/products", model);
    alert("All good!");
  };

  return (
    <div>
      {products.map((p) => (
        <div key={p._id}>
          <h1>{p.displayName}</h1>
          <p>{p.price}</p>
        </div>
      ))}
      <form className="flex flex-col">
        <input name="displayName" onInput={updateModel} ref={inputRef} />
        <input
          type="number"
          name="price"
          onInput={updateModel}
          ref={priceInputRef}
        />
        <button type="button" onClick={createProduct}>
          Create
        </button>
      </form>
    </div>
  );
}
