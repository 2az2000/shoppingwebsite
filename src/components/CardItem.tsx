'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { IProductItem } from "./Product";
import CradCounter from "./CradCounter";

interface ICardItemProps{
  id : number
  qty : number
}
export default function CardItem({id , qty}:ICardItemProps) {

  const [data , setData] = useState({} as IProductItem)

  useEffect(()=>{
    axios(`http://localhost:4000/product/${id}`).then(res =>{
      const {data} = res
      console.log(data);
      
      setData(data)
    })
  },[])

  return (
    <div className="grid grid-cols-12 bg-slate-100 mt-2">
      <img
        className="col-span-2 h-full"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtnvAOajH9gS4C30cRF7rD_voaTAKly2Ntaw&s"
        alt=""
      />
      <div className="col-span-10 p-4">
        <h2 className="text-xl font-bold">{data.title}</h2>
        <p>
          تعداد <span>{qty}</span>
        </p>
        <p>
          قیمت <span>{data.price}$</span>
        </p>

        <CradCounter id={id.toString()}/>
      </div>
    </div>
  );
}
