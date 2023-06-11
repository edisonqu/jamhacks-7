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
    const file = selectedImage;

    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            const byteArray = new Uint8Array(reader.result);
            const base64String = btoa(
                byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            setByteArray(byteArray);

            console.log('Image as byte array:', byteArray);
            const currentDate = new Date();
            const displayName = localStorage.getItem("name");
            const id = localStorage.getItem('id');
            const record = {displayName, id, currentDate, byteData: base64String};

            fetch('http://127.0.0.1:5000/verify', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(record)
            }).then(response => response.json())
            .then(data => {
              console.log("Success!", data);
              const numberResult = Number(data);
              console.log("Number result:", numberResult);
            })
            .catch(error => {
              console.log("Error:", error);
            });

            setSelectedImage(URL.createObjectURL(file));
        };
        reader.readAsArrayBuffer(file);
    }
};


  return (
    <div>
        <h1 className='text-center text-6xl mb-2'>Track</h1>
        <div className='bg-white mx-60 rounded-3xl flex flex-col justify-between shadow-2xl' style={{ height: 650}}>
            <div className='flex justify-between mx-20 mt-10'>
                <div>
                    <h1 className='text-3xl text-blue-700 font-semibold'>Upload</h1>
                    <h2 className='text-blue-300 text-xl'>A picture of yourself <br /> after the shower</h2>
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