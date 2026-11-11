import React from 'react'

import { tvData } from '../data/tv'
import { furnitureData } from '../data/furniture'

const firstFiveImages = tvData.slice(0, 5)

const Tv = () => {
    console.log(firstFiveImages, "First Five Images")
  return (
    <>
    <div className="proTitle">
        <h2>Television</h2>
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

export default Tv