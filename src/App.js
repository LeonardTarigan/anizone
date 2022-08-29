import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import GlobalProvider from './context/GlobalContext';
import CurrentAnime from './pages/CurrentAnime';
import Home from './pages/Home';
import TopAnime from './pages/TopAnime';
import UpcomingAnime from './pages/UpcomingAnime';

function App() {
    return (
        <div className='w-full max-w-screen-2xl'>
            <BrowserRouter>
                <GlobalProvider>
                    <Loading />
                    <Navbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route
                            path='/on-going-anime'
                            element={<CurrentAnime />}
                        />
                        <Route
                            path='/upcoming-anime'
                            element={<UpcomingAnime />}
                        />
                        <Route path='top-anime' element={<TopAnime />} />
                    </Routes>
                    <Footer />
                </GlobalProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
