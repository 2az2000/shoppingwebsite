import Container from "@/components/Container";
import CradCounter from "@/components/CradCounter";
import { IProductItem } from "@/components/Product";
import React from "react";

interface IProductProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{}>;
}

export default async function Product({ params }: IProductProps) {
  const { id } = await params;

  const result = await fetch(`http://localhost:4000/product/${id}`);
  const data = (await result.json()) as IProductItem;

  return (
    <Container className="">
      <div className="grid grid-cols-12 shadow-md mt-8">
        <div className="grid col-span-3">
          <img src={data.image} alt="" />
        </div>
        <div className="grid col-span-9 px-5">
          <h2 className="font-bold text-2xl">{data.title}</h2>
          <p className="text-gray-600">{data.description}</p>
          <p className="font-bold">
            قیمت<span> {data.price}</span>
          </p>

          <CradCounter id={id} />
        </div>
      </div>
    </Container>
  );
}
