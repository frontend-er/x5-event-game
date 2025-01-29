import { auth } from "../firebase";  
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";  

const handleSignUp = async (email, password) => {  
  try {  
    await createUserWithEmailAndPassword(auth, email, password);  
  } catch (error) {  
    console.error("Error signing up:", error);  
  }  
};  

const handleLogin = async (email, password) => {  
  try {  
    await signInWithEmailAndPassword(auth, email, password);  
  } catch (error) {  
    console.error("Error logging in:", error);  
  }  
};  
