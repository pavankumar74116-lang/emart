import React from 'react'

import { kitchenData } from '../data/kitchen'

const firstFiveImages = kitchenData.slice(0, 5)

const Kitchen = () => {
  return (
    <>
    <div className="proTitle">
        <h2>Kitchen</h2>
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

export default Kitchen