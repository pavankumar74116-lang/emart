import React from 'react'

import { acData } from '../data/ac'

const firstFiveImages = acData.slice(0, 5)

const Ac = () => {
  return (
    <>
    <div className="proTitle">
        <h2>Air Conditioner</h2>
    <div className='proSection'>
        {
            firstFiveImages.map((item) => {
                return(
                    <div className='imgBox'>
                        <img className ="proImage" src={item.image} alt="" />
                    </div>
                )
            })
        }
    </div>
    
    </div>
    </>
  )
}

export default Ac