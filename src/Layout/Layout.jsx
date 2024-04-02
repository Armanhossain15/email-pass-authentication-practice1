import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";


const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
        </div>
    );
};

export default Layout;