import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


import { useEffect, useState } from 'react';
import useAxiosPublic from './../hooks/useAxiosPublic';
import auth from './../utils/firebase.config';
import AuthContext from "./AuthContext";



const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const axiosPublic = useAxiosPublic()


    const googleProvider = new GoogleAuthProvider()

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const registerUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const loginUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logoutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

    const updateUserProfile = (name, image,) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: image
        })
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
            } else {
                setUser(null)
            }
            setLoading(false)
        });

        return () => {
            unsubscribe();
        };
    }, []);



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {

            if (currentUser) {
                //  set token to localstorage

                const userInfo = { email: currentUser?.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setUser(currentUser)
                            setLoading(false)
                        }
                    })
                    .catch(error => {
                        console.error("JWT error:", error);
                    });
            } else {
                // remove token from localstorage

                localStorage.removeItem('access-token');
                setUser(currentUser)
                setLoading(false)
            }

        });

        return () => unsubscribe();
    }, [axiosPublic]);

    


    const authInfo = {
        user,
        loading,
        setLoading,
        setUser,
        googleLogin,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;