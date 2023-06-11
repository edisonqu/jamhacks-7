import { useEffect, useState } from "react" 
import { GoThreeBars } from "react-icons/go"

import {
   Link,
   useLocation
} from "react-router-dom";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const links = [
    {
        name: "Home",
        link: "/",
        id: "home",
        priority: false
    },
    {
        name: "Calendar",
        link: "/calendar",
        id: "calendar",
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
    const firebaseConfig = {
        apiKey: "AIzaSyATw-QdOtHbH1qVnyT1rWch27JuwXRIGGU",
        authDomain: "jamhacks7-2e678.firebaseapp.com",
        projectId: "jamhacks7-2e678",
        storageBucket: "jamhacks7-2e678.appspot.com",
        messagingSenderId: "265882374247",
        appId: "1:265882374247:web:924e0edf5eaf15e21d44c2",
        measurementId: "G-P52FERNNP8"
    };

    firebase.initializeApp(firebaseConfig);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then((result) => {
            // Signed in successfully
            const user = result.user;
            console.log('Signed in successfully:', user);
            console.log('Firebase User ID:', user.uid);
            console.log('Firebase Display Name: ', user.displayName)
            localStorage.setItem('uid', JSON.stringify(user.uid));
            localStorage.setItem('name', JSON.stringify(user.displayName));
            setLoggedIn(!loggedIn)
          })
          .catch((error) => {
            // Sign in failed
            console.error('Sign in with Google failed:', error);
          });
        };
        
    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
            console.log('Signed out successfully');
            setLoggedIn(!loggedIn)
            })
            .catch((error) => {
            console.error('Sign out failed:', error);
            });
        };


   const [showDropdown, setShowDropdown] = useState(false);
   const { pathname } = useLocation();

   const [loggedIn, setLoggedIn] = useState(false)




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
                                    onClick={() => signOut()}
                                >
                                    Log out
                                </button>
                            </Link>
                        </div>
  
                    ) : (
                        <Link to='/'>
                            <button
                                className="text-orange-900 hover:bg-orange-600 hover:text-orange-300 text-center border border-solid border-orange-900 mt-1 lg:mt-0 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                                data-test-id={`navbar-login`}
                                onClick={(e) => signInWithGoogle()}
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