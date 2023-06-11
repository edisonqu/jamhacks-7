import React from 'react'
import "./page-styles/Home2.css"
import Calendar from '../pictures/calendar.png'
import Waterloo from '../pictures/waterloo.png'
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className='bg-div bg-no-repeat bg-cover flex items-center flex-col justify-center h-full w-full mt-20'>
        <h1 className='text-8xl text-blue-800 my-2'>Gamifiying Hygiene</h1>
        <h1 className='text-5xl text-blue-600 my-2'>For CS and CE Majors @ uWaterloo</h1>
        <Link to="https://www.jamhacks.ca/">
            <button className="rounded-lg p-6 px-24 text-white bg-blue-800 font-bold hover-scale my-2">
                Get Started
            </button>
        </Link>
        <div className='flex w-full justify-center mt-6'>
            <img src={Calendar}></img>
            <img src={Waterloo}></img>
        </div>
    </div>
  )
}

export default Home