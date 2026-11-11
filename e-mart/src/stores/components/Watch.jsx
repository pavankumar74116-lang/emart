import React from 'react'

import { watchData } from '../data/watch'

const firstFiveImages = watchData.slice(0, 5)

const Watch = () => {
  return (
    <>
    <div className="proTitle">
        <h2>Watches</h2>
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

export default Watch