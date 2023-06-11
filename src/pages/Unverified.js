import React from 'react'
import Waterloo from '../pictures/waterloo.png'

const Unverified = () => {
  return (
    <div className='flex items-center justify-center text-6xl font-bold text-red-900 flex-col mt-16'>
        <h1>Unfortunately, you have not been verified</h1>
        <img src={Waterloo}></img>
        <h1 className='text-black text-5xl'>Score: {localStorage.getItem("score")}</h1>
    </div>
  )
}

export default Unverified