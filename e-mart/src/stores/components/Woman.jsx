import React from 'react'

import { womanData } from '../data/woman'

const firstFiveImages = womanData.slice(0, 5)

const Woman = () => {
  return (
    <>
    <div className='proTitle'>
    <h2>Woman Dressing</h2>
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

export default Woman