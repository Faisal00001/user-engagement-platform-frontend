import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContext = createContext(null)
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const axiosPublic = useAxiosPublic()
    const googleProvider = new GoogleAuthProvider()
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }
    useEffect(() => {
        // Subscribe to authentication state changes
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            // Set the current user in the state
            setUser(currentUser)
            console.log(currentUser)
            // If there is a current user (i.e., user is authenticated)
            if (currentUser) {
                const userInfo = { email: currentUser.email }
                // Send a POST request to the '/jwt' endpoint with user info
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            // Store the token in local storage
                            localStorage.setItem('access-token', res.data.token)
                            setLoading(false);
                        }

                    })

            }
            else {
                // Remove access token from local storage
                localStorage.removeItem('access-token');
                setLoading(false);
            }

        })
        // Clean up function to unsubscribe from authentication state changes
        return () => {
            return unSubscribe();
        }
    }, [axiosPublic])
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {
                children
            }
        </AuthContext.Provider>
    );
};

export default AuthProvider;