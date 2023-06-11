import React from 'react'
import { useState } from 'react'
import Check from '../pictures/check.png'


import './page-styles/Track.css'



const Track = () => {
    const [selectedImage, setSelectedImage] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [byteArray, setByteArray] = useState();

    const changeHandler = (event) => {
        setSelectedImage(event.target.files[0]);
        setIsFilePicked(true);
    }

	const handleSubmission = (e) => {
        e.preventDefault();
        const file = selectedImage
    
        // Read the file as an ArrayBuffer
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const byteArray = new Uint8Array(reader.result);
                setByteArray(byteArray)
            
                // Do further processing with the byte array, such as sending it to a server or storing it in a database
                console.log('Image as byte array:', byteArray);
            };
            console.log("Byte")
            console.log(byteArray)
            reader.readAsArrayBuffer(file);
            console.log("HEY")
        
            setSelectedImage(URL.createObjectURL(file));
            console.log("HEYA")
            console.log("ssls")
            const currentDate = new Date();
            const date = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            const displayName = localStorage.getItem("name")
            const id = localStorage.getItem('id')
            console.log(currentDate)
            const record = {displayName, id, currentDate, byteArray}

          
            
            // Using Fetch API
            fetch('/verify', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            }).then(response => response.json())
            .then(data => {
              console.log("Success!", data);
              // Use the response data as a number
              const numberResult = Number(data);
              console.log("Number result:", numberResult);
            })
            .catch(error => {
              console.log("Error:", error);
            });
        }
    };

  return (
    <div>
        <h1 className='text-center text-6xl mb-6 text-blue-600'>Track</h1>
        <div className='bg-white mx-72 rounded-3xl flex flex-col justify-between shadow-2xl' style={{ height: 650}}>
            <div className='flex justify-between mx-20 mt-10'>
                <div>
                    <h1 className='text-3xl text-blue-700 font-semibold'>Upload</h1>
                    <h2 className='text-blue-300 text-xl'>A picture of yourself <br /> after the shower</h2>
                    <img className='rounded-full w-56'src="https://pbs.twimg.com/media/Dk-WD9QXoAAjIwW?format=jpg&name=large"></img>
                </div>
                <div>
                    <div className='upload-container'>
                        <form
                            className="flex flex-col gap-2 self-center mt-4 w-full p-16 pt-4 xl:w-5/6"
                            onSubmit={handleSubmission}
                        >
                            <input type="file" name="file" id="file-input" accept="image/*" onChange={changeHandler}/>
                    
                            <label for="file-input">
                                <i class="fa-solid fa-arrow-up-from-bracket"></i>
                                &nbsp; Choose Files to Upload
                            </label>
                            <ul id="files-list"></ul>
                            {isFilePicked ? (
                                <div>
                                    <p>Filename: {selectedImage.name}</p>
                                    <p>Filetype: {selectedImage.type}</p>
                                    <p>Size in bytes: {selectedImage.size}</p>
                                </div>
                            ) : (
                                <p>Select a file to show details</p>
                            )}
                            
                            <input
                                type="submit"
                                className="rounded-lg p-4 text-white bg-zinc-800 active:bg-zinc-600 transition-all duration-75 font-bold cursor-pointer"
                                value="Submit"
                            />
                        </form>
                    </div>
			<div>

			</div>
                </div>
            </div>
            <div className='bg-blue-300 w-full h-1'></div>
            <div className='flex justify-between mb-20 mt-20 mx-20'>
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