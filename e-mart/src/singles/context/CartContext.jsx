import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
const CartContext = createContext()

export const CartProvider=({children})=> {
    const [cartItems, setCartItems] = useState([])

   function addToCart(item) {
        setCartItems([...cartItems, item])
        toast.success("Product Added to cart")   
    }

    function removeFromCart(item) {
        setCartItems(cartItems.filter((apple)=> apple!==item))
    }


    return(
        <CartContext.Provider value={{cartItems, addToCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = ()=> {
    return useContext(CartContext)
}