import React from 'react'
import { useState } from 'react'
import Calendar from 'react-calendar';
import './page-styles/Home.css'

const Home = () => {
    const currentDate = new Date();
    const showeredDate1 = new Date(2023, 5, 11); 
    const showeredDate2 = new Date(2023, 5, 12); 
    const showeredDates = [showeredDate1, showeredDate2]
    
    const [date, setDate] = useState(new Date());
    const onChange = date => {
        setDate(date)
    }

    const id = localStorage.getItem("id")
    const record = {id}

    // Using Fetch API
    fetch('/calendar', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
        }
    ).then(response => response.json())
    .then(data => {
      console.log("Success! Response data:", data);
      // Do further processing with the response data here
    })
    .catch(error => {
      console.error("Error:", error);
    })

  return (
    <div>
        <div className='w-full flex flex-col items-center justify-center h-full'>    
            <h1 className='text-6xl mb-6'>Shower Tracker</h1> 
            <Calendar onChange={onChange} className=''
             tileClassName={({ date, view }) => {
                // Check if the date is the one you want to highlight

                for (let i = 0; i < showeredDates.length; i++) {
                    const showeredDate = new Date(showeredDates[i]);
                    if (
                    
                        date.getFullYear() === showeredDate.getFullYear() &&
                        date.getMonth() === showeredDate.getMonth() &&
                        date.getDate() === showeredDate.getDate()
                    
                    ) {
                    // Return a custom class name for the specific date
                    return 'showered-date';
                    }
                    else {
                        if (currentDate > date) {
                            return 'missed-date';
    
                        }
                    }
                }

              

               
              }}/>
            <p>{date.toString}</p>
         </div>

    </div>
  )
}

export default Home