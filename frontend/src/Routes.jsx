import React,{useEffect} from "react";
import { useNavigate,useRoutes } from "react-router-dom";

//Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";


//Auth context
import { useAuth } from "./authContext";


const ProjectRoutes = () => {
const {currentUser, setCurrentUser} = useAuth();
const navigate = useNavigate();
useEffect(()=>{
    const userId = localStorage.getItem('userId');

    if(userId&& !currentUser) {
        setCurrentUser({ userId });
    }

    if(!userId && !["/auth", "/signup"].includes(window.location.pathname)) {
        navigate("/auth");
       
    }

    if(userId&&window.location.pathname === "/auth") {
        navigate("/");
    }
},[setCurrentUser, currentUser, navigate]);

let element= useRoutes([
    {
         path:"/",
            element:<Dashboard/>
    },
      {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        },
        { path: '/login', element: <Login /> },
        {
            path:"/profile",
            element:<Profile/>
        }
])
return element;

}

export default ProjectRoutes;