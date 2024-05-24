import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar/Navbar";

const Layout: React.FC = () => (
    <>
        <Navbar />
        <Outlet />
    </>
);

export default Layout;