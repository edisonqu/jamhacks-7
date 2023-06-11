import React from 'react'
import { useEffect } from 'react'

const Leaderboard = () => {
    useEffect(() => {
         // Using Fetch API
        fetch('/leaderboard', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            }
        ).then(response => response.json())
        .then(data => {
            console.log("Success! Response data:", data);
            // Do further processing with the response data here
        })
        .catch(error => {
            console.error("Error:", error);
        })

    }, [])
   

  return (
    <div className='bg-white px-20 py-20 shadow-xl mx-20 rounded-xl'>
        <div className="flex justify-center flex-col">
            <h1 className='text-center text-6xl mb-12'>Leaderboard</h1>
            <table className='mx-48 text-2xl text-center text-blue-700'>
                <tr>
                    <th className=''>Name</th>
                    <th className=''># Showers</th>
                </tr>
                <tr>
                    <td>Stephen</td>
                    <td>30</td>
                </tr>
                <tr>
                    <td>Alisa</td>
                    <td>29</td>
                </tr>
    
            </table>
        </div>

    </div>
  )
}

export default Leaderboard