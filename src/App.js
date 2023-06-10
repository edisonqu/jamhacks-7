import { Routes, Route, BrowserRouter } from "react-router-dom";
import React, { Suspense } from "react";
import { AnimatePresence } from 'framer-motion'
 
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Track from './pages/Track'
import Leaderboard from './pages/Leaderboard'

function App() {
 return (
   <div className="App">
     <BrowserRouter>
       <Suspense fallback={<div>Page Loading...</div>}>
         <Navbar />
         <AnimatePresence
          mode='wait'>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/track" exact element={<Track />} />
              <Route path="/leaderboard" exact element={<Leaderboard />} />
            </Routes>
         </AnimatePresence>
       </Suspense>
     </BrowserRouter>
   </div>
 );
}
 
export default App;