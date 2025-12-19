import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';


  const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const[user,setUser] = useState(null)
    const[loading, setLoading]= useState(true)

    const registerUser =(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signInUser =(email,password)=>{
      setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    const signInWithGoogle=()=>{
      setLoading(true)
      return signInWithPopup(auth,googleProvider)
    }

    const signOutUser=()=>{
      setLoading(true)
      return signOut(auth)
    }

     const resetPassword=(email)=>{
        setLoading(true)
    return sendPasswordResetEmail(auth, email)
    }

    const updateUserProfile=(profile)=>{
      setLoading(true)
      return updateProfile(auth.currentUser,profile)
    }

    useEffect(()=> {
       const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
        setUser(currentUser)
        setLoading(false)
        console.log(currentUser);
       })
       return ()=>{
        unsubscribe();
       }
    },[])

    const authInfo = {
        registerUser,
        signInUser,
        signInWithGoogle,
        loading,
        setLoading,
       signOutUser,
       updateUserProfile,
       user,
       setUser,
       resetPassword
    }

    return (
      <AuthContext value={authInfo}>
        {children}
      </AuthContext>
    );
};

export default AuthProvider;