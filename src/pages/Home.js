import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import './page-styles/Home.css'

const Home = () => {
    
    const [date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date)
    }

  return (
    <div>
        <div className='w-full flex flex-col items-center justify-center h-full mt-20'>    
            <h1 className='text-6xl mb-6'>Shower Tracker</h1> 
            <Calendar onChange={onChange} className=''/>
            <p>{date.toString}</p>
            <p></p>
         </div>

    </div>
  )
}

export default Home