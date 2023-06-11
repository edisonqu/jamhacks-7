import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { AnimatePresence } from 'framer-motion'

import Logo from "./pictures/logo.png"  
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Track from './pages/Track'
import Leaderboard from './pages/Leaderboard'
import Login from './pages/Login'

function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Suspense fallback={<div>Page Loading...</div>}>
        <div className="bg-[#F8FAFF]">
        <div className="flex w-full p-8">
          { <img src={Logo} alt="Logo" width={29*5} height={42*5} /> }
         <Navbar />
         </div>
         </div>
         <AnimatePresence
          mode='wait'>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/calendar" exact element={<Calendar />} />
              <Route path="/track" exact element={<Track />} />
              <Route path="/leaderboard" exact element={<Leaderboard />} />
              <Route path="/login" exact element={<Login />} />
            </Routes>
         </AnimatePresence>

       </Suspense>
     </BrowserRouter>
   </div>
 );
}
 
export default App;