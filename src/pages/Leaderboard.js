import React from 'react'
import {useEffect, useState} from 'react'
import {logDOM} from "@testing-library/react";

const Leaderboard = () => {
    const [info, setInfo] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://127.0.0.1:5000/leaderboard', {
                method: 'GET',
                headers: {"Content-Type": "application/json"},
            });
            const data = await response.json();
            console.log("API response data:", data);
            setInfo(data);
            console.log(info)
        }
        fetchData().then(r => console.log(r));
    }, [])

    return (
        <div className='bg-white px-20 py-20 shadow-xl mx-20 rounded-xl'>
            <div className="flex justify-center flex-col">
                <h1 className='text-center text-6xl mb-12 text-blue-700'>Leaderboard</h1>
                <table className='mx-48 text-2xl text-center text-blue-700'>
                    <tr>
                        <th className=''>Name</th>
                        <th className=''># Showers</th>
                    </tr>
                    {info
                        .sort((a, b) => b.shower_count - a.shower_count)
                        .map((item, index) => {
                            return (
                                <tr key={index}>
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