import React, { useState } from 'react'

import { watchData } from '../data/watch'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
const WatchPage = () => {

    const [selectedProduct, setSelectedProduct] = useState([])

    const companyHandler=(mango)=>{
        if(selectedProduct.includes(mango)){
            setSelectedProduct(selectedProduct.filter(item => item !== mango))
        } else {
            setSelectedProduct([...selectedProduct, mango])
        }
    }

    const filteredProduct = selectedProduct.length===0?
    watchData : watchData.filter((orange)=>selectedProduct.includes(orange.brand))
  return (
    <>
    
    <div className="fullpage">
        <div className="pro-selected">

        {watchData.map((phone)=>{
            return(
                <div className='pro-input'>
                    <label>
                        <input type="checkbox" 
                        checked = {selectedProduct.includes(phone.brand)}
                        onChange={()=>companyHandler(phone.brand)}
                        />
                        {phone.brand}
                    </label>
                </div>
            )
        })}
    </div>
        <div className="pageSection">
        {filteredProduct.map((item)=>{
            return(
                <div className='furniture-page'>
                    <Link to={`/watch/${item.id}`}>
                        <div className="pageImg">
                            <img src={item.image} alt="" />
                        </div>
                    </Link>
                    <div className="proModel">
                        <h5>{item.brand}, {item.model}</h5>
                    </div>
                </div>
            )
        })}
    </div>
    </div>
    </>
  )
}

export default WatchPage