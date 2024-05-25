import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const Layout: React.FC = () => (
    <>
        <Navbar />
        <div className="sm:rounded-lg w-1/2 mx-auto mt-4">
            <Outlet />
        </div>
    </>
);

export default Layout

