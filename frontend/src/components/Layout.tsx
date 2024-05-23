import { Navbar } from "./Navbar/Navbar";

interface LayoutProps {
    element: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ element }) => (
    <>
        <Navbar />
        {element}
    </>
);

export default Layout;