import React from 'react'

const Leaderboard = () => {
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