// import React,{ useState,useEffect,useContext, createContext } from "react"
// import {auth} from '../../firebase'
// import { onAuthStateChanged } from "firebase/auth"

// const AuthContext=createContext()

// export function useAuth(){
//     return useContext(AuthContext)
// }

// export function AuthProvider({children}){

//     const [currentUser,setCurrentUser]=useState(null)
//     const [userLoggedIn,setUserLoggedIn]=useState(false)
//     const [loading,setLoading]=useState(true)

//     useEffect(()=>{
        
//         const unsubscribe=onAuthStateChanged(auth,initialUser)
//         return unsubscribe
//     },[])

//     async function initialUser(user){
//         if (user){
//             setCurrentUser({...user})
//             setUserLoggedIn(true)
//         }else{
//             setCurrentUser(null)
//             setUserLoggedIn(false)
//         }
//         setLoading(false)
//     }

//     const value={
//         currentUser,
//         userLoggedIn,
//         loading
//     }

//     return (
//         <AuthContext.Provider value={value}>
//             {!loading && children}
//         </AuthContext.Provider>
//     )
// }



import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';
import {auth} from './firebase'

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
