import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/configureStore";

export default function RequiredAuth(){
    const {user} =useAppSelector((state:any)=>state.account);
    const location=useLocation();
    if(!user){
        return <Navigate to='/login' state={{from:location}}/>
    }
    return <Outlet/>
}