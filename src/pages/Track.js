import React from 'react'
import { useState } from 'react'
import Check from '../pictures/check.png'

const Track = () => {
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};

	const handleSubmission = () => {
	};

  return (
    <div>
        <div className='bg-gray-100 mx-60 mt-20 rounded-3xl flex flex-col justify-between shadow-2xl' style={{ height: 550}}>
            <div className='flex justify-between mx-20 mt-10'>
                <div>
                    <h1 className='text-3xl text-blue-700 font-semibold'>Upload</h1>
                    <h2 className='text-blue-300 text-xl'>A picture of yourself <br /> after the shower</h2>
                </div>
                <div>
    
                    <input type="file" name="file" onChange={changeHandler} />
                    {isFilePicked ? (
                        <div>
                            <p>Filename: {selectedFile.name}</p>
                            <p>Filetype: {selectedFile.type}</p>
                            <p>Size in bytes: {selectedFile.size}</p>
                            <p>
                                lastModifiedDate:{' '}
                                {selectedFile.lastModifiedDate.toLocaleDateString()}
                            </p>
                        </div>
                    ) : (
                        <p>Select a file to show details</p>
                    )}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
                </div>
            </div>
            <div className='bg-blue-300 w-full h-1'></div>
            <div className='flex justify-between mx-20 mb-20'>
                <div>
                    <img src={Check}></img>
        
                </div>
                <div>
                    <h1 className='text-3xl text-blue-700 font-semibold'>Verify</h1>
                    <h2 className='text-blue-300 text-xl'>When the photo is verified <br /> you will be verified for the day</h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Track