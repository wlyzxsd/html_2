import Navbar from "../components/Navbar";
import Gallery from "./components/Gallery";
import CircleCards from "./components/CircleCards";
import Content from "./components/Content";
import Footer from "../components/Footer";

function Main() {
    return (
        <div>
            <Navbar active='1' />
            <Gallery />
            <CircleCards />
            <Content />
            <Footer />
        </div>
    );
}

export default Main;