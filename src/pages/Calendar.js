import React from 'react'
import { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import './page-styles/Home.css'


const Calendar1 = () => {
    const currentDate = new Date();


    
    const [info, setInfo] = useState([]);

    const id = localStorage.getItem("uid")
    const record = id.replace(/"/g, '');


    useEffect(() => {
      fetch(`http://127.0.0.1:5000/showers/${record}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
          // body: JSON.stringify(record)
          }
      ).then(response => response.json())
      .then(data => {
        const dates = data.map(dateString => new Date(dateString));

        setInfo(dates)
        console.log("Success! Response data:", dates);
        // Do further processing with the response data here
      })
      .catch(error => {
        console.error("Error:", error);
      })
    }, [])
    

  return (
    <div>
        <div className='w-full flex flex-col items-center justify-center h-full'>    
            <h1 className='text-6xl mb-6'>Shower Tracker</h1> 
            <Calendar className=''
             tileClassName={({ date, view }) => {
                // Check if the date is the one you want to highlight
                const isShoweredDate = info.some(showeredDate => (
                    date.getFullYear() === showeredDate.getFullYear() &&
                    date.getMonth() === showeredDate.getMonth() &&
                    date.getDate() === showeredDate.getDate()
                  ));
      
                  // Return class names based on the conditions
                  if (isShoweredDate) {
                    return 'showered-date';
                  } else if (currentDate > date) {
                    return 'missed-date';
                  }

               
                }
              }/>
            <p></p>
         </div>

    </div>
  )
}

export default Calendar1