import React from 'react'
import Waterloo from '../pictures/waterloo.png'

const Verified = ({ score }) => {
  return (
    <div className='flex items-center justify-center text-6xl font-bold text-blue-900 flex-col mt-16'>
        <h1>Congratulations! You have been verified</h1>
        <img src={Waterloo}></img>
        <h1 className='text-black text-5xl'>Score: {score}</h1>
    </div>
  )
}

export default Verified