"use client";
import { createContext, useContext, useEffect, useState } from "react";

type shoppingCardContextProviderProps = {
  children: React.ReactNode;
};
type CardItems ={
    id: number,
    qty: number
}
type TshoppingCardContext = {
    cardItems : CardItems[],
    handleIncreaseProductQty : (id : number) => void 
    getProductQty : (id : number) => number
    cardTotalQty : number
    handleDecreaseProductQty : (id : number) =>void
    handleRemoveProduct : (id : number) => void
}
const shoppingCardContext = createContext({} as TshoppingCardContext);

export const useShoppingCardContext = () =>{
    return useContext(shoppingCardContext)
}



export function ShoppingCardContextProvider({
  children
}: shoppingCardContextProviderProps) {

    const [cardItems , setCardItems] = useState<CardItems[]>([])

    const cardTotalQty = cardItems.reduce((totalQty , item)=>{
        return totalQty + item.qty
    },0)

    const getProductQty = (id : number) =>{
        return cardItems.find(item => item.id == id)?.qty || 0
    }

    const handleIncreaseProductQty = (id : number) => {
        setCardItems((currentItem) =>{
            const isNotProductExist = currentItem.find(item => item.id == id) == null

            if(isNotProductExist){
                return [...currentItem , {id: id , qty : 1}]
            } else{
                return currentItem.map(item => {
                    if(item.id == id){
                        return {
                            ...item,
                            qty: item.qty + 1
                        }
                    }else{
                        return item
                    }
                })
            }
        })
    }

    const handleDecreaseProductQty = (id : number) => {
        setCardItems(currentItem =>{
            let isLastOne = currentItem.find(item => item.id == id)?.qty == 1;

            if(isLastOne){
                return currentItem.filter(item => item.id != id)
            }else{
                return currentItem.map(item =>{
                    if(item.id == id){
                        return {...item , qty : item.qty - 1}
                    }
                    else{
                        return item
                    }
                })
            }
        })
    }
    useEffect(() =>{
        const cardItems = localStorage.getItem("cardItems")
        if(cardItems){
            setCardItems(JSON.parse(cardItems))
        }
    },[])

    useEffect(() =>{
        localStorage.setItem("cardItems" , JSON.stringify(cardItems))
    },[cardItems])

    const handleRemoveProduct = (id : number) => {
        setCardItems(currentItem => {
            return currentItem.filter(item => item.id != id)
        })
    }

        return (
    <shoppingCardContext.Provider value={{cardItems  , handleIncreaseProductQty , getProductQty , cardTotalQty , handleDecreaseProductQty , handleRemoveProduct}}>
      {children}
    </shoppingCardContext.Provider>
  );
}
