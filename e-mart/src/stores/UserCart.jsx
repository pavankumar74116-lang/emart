import React from 'react'

import { useCart } from '../singles/context/CartContext'

const UserCart = () => {

    const {cartItems, addToCart, removeFromCart} = useCart()
  return (

    <>
    <div>
        
        <h2 className='y-cart'>Your Cart</h2>
        {cartItems.length===0 ?
        (<p className='empty'>Your Cart is Empty</p>):
        <div>
        {cartItems.map((item)=>{
            return(
                <div className='cart-section'>
                    <div className="cart-img">
                        <img src={item.image} alt="" />
                    </div>
                    <div className="cart-details">
                        <h3>{item.product}</h3>
                        <h2>{item.price}</h2>
                        <h3>{item.model}</h3>
                        <button className="removeBtn" onClick={()=>removeFromCart(item)}>Remove From Cart</button>
                    </div>
                </div>
            )
        })}
        </div>
    
}
</div>
    </>
  )
}

export default UserCart