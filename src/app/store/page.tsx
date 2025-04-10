import React from "react";
import Container from "../../components/Container";
import Product, { IProductItem, IProductList } from "../../components/Product";
import Link from "next/link";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";

interface IStoreProps {
  params: Promise<{}>;
  searchParams: Promise<{ page: string; per_page: string; title: string }>;
}

export default async function Store({ searchParams }: IStoreProps) {
  const page = (await searchParams).page ?? "1";
  const per_page = (await searchParams).per_page ?? "4";
  const title = (await searchParams).title ?? "";
  const result = await fetch(
    `http://localhost:4000/product?_page=${page}&_per_page=${per_page}&title=${title}`
  );
  const data = (await result.json()) as IProductList;
  // console.log(data.data);

  return (
    <Container className="">
      <h1 className="my-5 w-fit border-b-2 border-black">خانه</h1>
      <SearchBar />
      <div className="grid grid-cols-4 gap-4">
        {data.data.map((item) => (
          <Link key={item.id} href={`/store/${item.id}`}>
            <Product {...item} />
          </Link>
        ))}
      </div>
      <Pagination pageCount={data.pages} />
    </Container>
  );
}
