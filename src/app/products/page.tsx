"use client";

import { IProduct } from "@/entities";
import { BlockBlobClient } from "@azure/storage-blob";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [model, setModel] = useState<IProduct>();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    })();
  }, []);

  const updateModel = () => {
    const { value: displayName } = nameInputRef.current!;
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
    const { data } = await axios.post("/api/contents/token", {
      blob: model!.images[0]!.id,
      permissions: "cw",
    });

    const client = new BlockBlobClient(data.uri);
    await client.uploadData(imageInputRef.current!.files![0]!);

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
        <input name="displayName" onInput={updateModel} ref={nameInputRef} />
        <input
          type="number"
          name="price"
          onInput={updateModel}
          ref={priceInputRef}
        />
        <input type="file" name="image" ref={imageInputRef} />
        <button type="button" onClick={createProduct}>
          Create
        </button>
      </form>
    </div>
  );
}
