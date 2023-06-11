import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import './page-styles/Home.css'

const Home = () => {
    const showeredDate = new Date(2023, 5, 11); 
    const missedDate = new Date(2023, 5, 12); 
    
    const [date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date)
    }

  return (
    <div>
        <div className='w-full flex flex-col items-center justify-center h-full mt-20'>    
            <h1 className='text-6xl mb-6'>Shower Tracker</h1> 
            <Calendar onChange={onChange} className=''
             tileClassName={({ date, view }) => {
                // Check if the date is the one you want to highlight
                if (
                  date.getFullYear() === showeredDate.getFullYear() &&
                  date.getMonth() === showeredDate.getMonth() &&
                  date.getDate() === showeredDate.getDate()
                ) {
                  // Return a custom class name for the specific date
                  return 'showered-date';
                }

                if (
                    date.getFullYear() === missedDate.getFullYear() &&
                    date.getMonth() === missedDate.getMonth() &&
                    date.getDate() === missedDate.getDate()
                  ) {
                    // Return a custom class name for the specific date
                    return 'missed-date';
                  }
              }}/>
            <p>{date.toString}</p>
            <p></p>
         </div>

    </div>
  )
}

export default Home