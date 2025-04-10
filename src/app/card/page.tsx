"use client";
import React, { useEffect, useState } from "react";
import Container from "../../components/Container";
import CardItem from "../../components/CardItem";
import { useShoppingCardContext } from "../../context/shoppingCardContext";
import axios from "axios";
import { IProductItem } from "../../components/Product";
import { formatNumberWithCommas } from "../../utils/number";

interface IDiscountPrice {
  id: number;
  code: string;
  percentage: number;
}

export default function Card() {
  const { cardItems } = useShoppingCardContext();
  const [data, setData] = useState<IProductItem[]>([]);
  const [disCountCode, setDisCountCode] = useState("");
  const [finalPrece, setFinalPrece] = useState(0);
  const [disCountedPrice, setDisCountedPrice] = useState(0);
  useEffect(() => {
    axios(`http://localhost:4000/product`).then((res) => {
      const { data } = res;
      console.log(data);

      setData(data);
    });
  }, []);

  let totalPrice = cardItems.reduce((total, item) => {
    let selectedProduct = data.find((product) => {
      product.id == item.id;
    });
    return total + (selectedProduct?.price || 0) * item.qty;
  }, 0);

  const handleSubmitDiscount = () => {
    axios(`http://localhost:4000/discounts?code=${disCountCode}`).then(
      (result) => {
        const data = result.data as IDiscountPrice[];

        const disCountedPrice = (totalPrice * data[0].percentage) / 100;
        const finalPrece = totalPrice - disCountedPrice;
        setFinalPrece(finalPrece);
        setDisCountedPrice(disCountedPrice);
      }
    );
  };

  return (
    <Container className="">
      <h1>سبد خرید</h1>
      <div className="">
        {cardItems.map((item) => (
          <CardItem key={item.id} {...item} />
        ))}
      </div>
      <div className="border shadow-md p-4 flex flex-col gap-2">
        <h3>
          قیمت کل{" "}
          <span>
            {formatNumberWithCommas(
              cardItems.reduce((total, item) => {
                let selectedProduct = data.find(
                  (product) => product.id == item.id
                );
                return total + (selectedProduct?.price || 0) * item.qty;
              }, 0)
            )}
            $
          </span>
        </h3>
        <h3>
          سود شما<span> {disCountedPrice}$</span>
        </h3>
        <h3>
          قیمت نهایی <span> {finalPrece}$</span>
        </h3>

        <div>
          <input
            className="border py-1"
            placeholder="کد تخفیف خود را وارد کنید"
            type="text"
            onChange={(e) => setDisCountCode(e.target.value)}
          />
          <button
            onClick={handleSubmitDiscount}
            className="bg-sky-400 text-white px-4 py-1 rounded mr-3"
          >
            اعمال
          </button>
        </div>
      </div>
    </Container>
  );
}
