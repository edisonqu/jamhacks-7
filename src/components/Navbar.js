import { useEffect, useState } from "react" 
import { GoThreeBars } from "react-icons/go"

import {
   Link,
   useLocation
} from "react-router-dom";


const links = [
    {
        name: "Home",
        link: "/",
        id: "home",
        priority: false
    },
    {
        name: "Track",
        link: "/track",
        id: "track",
        priority: false
        },
    {
        name: "Leaderboard",
        link: "/Leaderboard",
        id: "leaderboard",
        priority: false
    }
]

   /*
   {
       name: "Sign Up",
       link: "/sign-up",
       id: "call-to-action",
       priority: true
   },
   */

 
const Navbar = () => {
   const [showDropdown, setShowDropdown] = useState(false);
   const { pathname } = useLocation();

   const [loggedIn, setLoggedIn] = useState(false)


   const handleClick = () => {
       setLoggedIn(!loggedIn)
   }

   return (
    //{pathname ? opacity:0 : opacity:1}
       <header className="w-full border-[#F8FAFF] border-solid border-2 flex flex-col justify-center bg-[#F8FAFF] z-[99999999] min-h-[7vh] py-2 lg:py-4 ">
           <div className="container px-4 mx-auto lg:flex lg:items-center m-30">
               <div className="flex justify-between items-center">
                   <Link className="flex flex-row items-center gap-4 font-bold text-xl text-teal" to="/">
                       {/* <h2 className="text-2xl text-[#3062E4] font-mono">Title</h2> */}
                   </Link>
 
                   <button
                       className="border border-solid border-gray-200 px-3 py-1 rounded text-gray opacity-50 hover:opacity-75 lg:hidden cursor-pointer"
                       aria-label="Menu"
                       data-test-id="navbar-menu"
                       onClick={
                           () => {
                               setShowDropdown(!showDropdown);
                           }}
                   >
                       <GoThreeBars />
                   </button>
               </div>
 
               <div className={`${showDropdown ? "flex" : "hidden"} lg:flex flex-col lg:flex-row lg:ml-auto mt-3 lg:mt-0`} data-test-id="navbar">
                    {loggedIn === true ? (

                        <div>
                            {links.map(({ name, link, priority, id }) => 
                                <Link key={name} className={`${priority ? "text-purple-900 hover:bg-purple-900 hover:text-[#3062E4] text-center border border-solid border-purple-900 mt-1 lg:mt-0 lg:ml-1" : "text-[#3062E4] hover:bg-gray-200/25 hover:text-[#3062E4]"} p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors ${pathname === name && "font-bold"}`} to={link}>
                                    {name}
                                </Link>
                            )}
                            
                            <Link to='/'>
                                <button
                                    className="text-orange-900 hover:bg-orange-600 hover:text-orange-300 text-center border border-solid border-orange-900 mt-1 lg:mt-0 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                                    data-test-id={`navbar-logout`}
                                    onClick={() => handleClick()}
                                >
                                    Log out
                                </button>
                            </Link>
                        </div>
  
                    ) : (
                        <Link to='/login'>
                            <button
                                className="text-orange-900 hover:bg-orange-600 hover:text-orange-300 text-center border border-solid border-orange-900 mt-1 lg:mt-0 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                                data-test-id={`navbar-login`}
                                onClick={(e) => handleClick()}
                            >
                                Log in
                            </button>
                        </Link>
                    )}
               </div>
               
           </div>
       </header>
   )
}
 
export default Navbar;