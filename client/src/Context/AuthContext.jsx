import { useEffect, useState } from "react";
import { useContext } from "react";
import { loginRoute } from "../api/Api";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";


const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  

const [loading,setLoading] = useState(true)
 
    const [user, setUser] = useState(null)
  

 useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

const loginHandler = async(username,password)=>{
  try {
    const res = await axios.post(loginRoute, { username, password });
    if (res.data.success){
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast("Login successfully");
      return true;
    } else {
      toast.error(res.data.message || "Login failed");
      return false;
    }
  } catch(err) {
    console.error(err);
    toast.error("Something went wrong");
    return false;
  }
}



    
    const logoutHandler = ()=>{
      setUser(null)
      localStorage.removeItem("user")
    }

  const value = {loginHandler,user,logoutHandler,loading};

  return <AuthContext.Provider value={value}>{!loading &&  children} </AuthContext.Provider>;
};

export const useAuth = ()=> useContext(AuthContext);
