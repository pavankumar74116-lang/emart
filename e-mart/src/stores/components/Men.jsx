import React from 'react'

import { menData } from '../data/men'

const firstFiveImages = menData.slice(0, 5)

const Men = () => {
  return (
    <>
    <div className="proTitle">
        <h2>Men</h2>
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

export default Men