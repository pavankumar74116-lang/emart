import React from 'react'

import { speakerData } from '../data/speaker'

const firstFiveImages = speakerData.slice(0, 5)

const Speaker = () => {
  return (
    <>
    <div className="proTitle">
        <h2>Speaker</h2>
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

export default Speaker