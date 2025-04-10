import React from 'react'

export interface IProductItem {
    id: number ,
    image : string,
    title: string,
    price: number,
    description: string
  }

  export interface IProductList{
    first: number | null,
    prev: number | null,
    next: number | null,
    last: number | null,
    pages: number ,
    items: number | null,
    data: IProductItem[]
  } 

export default function Product({id , image , title , price} : IProductItem) {
  return (
    <div className='shadow-lg rounded-md px-5'>
        <img className='h-48 w-100 bg-cover' src={image} alt="" />
        <div>
            <h3>{title}</h3>
            <h4>{price}</h4>
        </div>
    </div>
  )
}
