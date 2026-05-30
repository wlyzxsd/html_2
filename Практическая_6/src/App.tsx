import './styles/App.css';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import CircleCards from './components/CircleCards';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {
    return (
        <div>
            <Navbar />
            <Gallery />
            <CircleCards />
            <Content />
            <Footer />
        </div>
    );
}

export default App;