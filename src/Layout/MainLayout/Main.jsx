import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer/Footer";
import Navbar from "../../Shared/Navbar/Navbar";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* Main Layout children */}
            <Outlet></Outlet>
            <Toaster
                position="top-center"
                reverseOrder={false}
            ></Toaster>
            <Footer></Footer>
        </div>
    );
};

export default Main;