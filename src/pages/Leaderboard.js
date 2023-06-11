import React from 'react'
import { useEffect, useState } from 'react'

const Leaderboard = () => {
    const [info, setInfo] = useState([])
    useEffect(() => {
         // Using Fetch API
        fetch('http://127.0.0.1:5000/leaderboard', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
            }
        ).then(response => response.json())
        .then(data => {
            setInfo(data)
            console.log("Success! Response data:", info);
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
                {info
                    .sort((a, b) => a.item.shower_count - b.item.shower_count)
                    .map((item, index) => {
                    return (
                    <tr>
                        <td>{item.display_name}</td>
                        <td>{item.shower_count}</td>
                    </tr>
                    );
                })}
    
            </table>
        </div>

    </div>
  )
}

export default Leaderboard