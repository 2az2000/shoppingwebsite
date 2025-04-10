"use client";
import { useShoppingCardContext } from "../context/shoppingCardContext";

interface IAddToCardProps {
  id: string;
}

export default function CradCounter({ id }: IAddToCardProps) {
  const {
    cardItems,
    handleIncreaseProductQty,
    getProductQty,
    handleDecreaseProductQty,
    handleRemoveProduct,
  } = useShoppingCardContext();
  console.log(cardItems);

  return (
    <div>
      <div className="mt-5">
        <button
          onClick={() => handleIncreaseProductQty(parseInt(id))}
          className="px-4 py-2 rounded bg-sky-500 text-white"
        >
          +
        </button>
        <span className="mx-5">{getProductQty(parseInt(id))}</span>
        <button
          onClick={() => handleDecreaseProductQty(parseInt(id))}
          className="px-4 py-2 rounded bg-sky-500 text-white"
        >
          -
        </button>
      </div>
      <button
        onClick={() => handleRemoveProduct(parseInt(id))}
        className="bg-red-500 text-white px-8 py-2 my-2 rounded"
      >
        حذف از سبد
      </button>
    </div>
  );
}
