import { PageProps } from "fresh";
import LoginHeader from "../../components/LoginHeader.tsx";
import Footer from "../../components/Footer.tsx";

const Layout = ({ Component }: PageProps) => {
    return (
        <>
            <LoginHeader />
            <Component />
            <Footer />
            </>
    );
};

export default Layout;