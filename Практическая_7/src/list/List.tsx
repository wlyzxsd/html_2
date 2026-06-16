import Navbar from "../components/Navbar";
import CarsGrid from "./components/CarsGrid";
import Footer from "../components/Footer";

function List() {
    return (
        <div>
            <Navbar active='2' />
            <CarsGrid />
            <Footer />
        </div>
    );
}

export default List;