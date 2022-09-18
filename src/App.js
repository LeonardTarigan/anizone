import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Navbar from './components/Navbar';
import GlobalProvider from './context/GlobalContext';
import GenreProvider from './context/GenreContext';
import AnimeDetail from './pages/AnimeDetail';
import CharacterDetail from './pages/CharacterDetail';
import CurrentAnime from './pages/CurrentAnime';
import Genres from './pages/Genres';
import Home from './pages/Home';
import SearchAnime from './pages/SearchAnime';
import TopAnime from './pages/TopAnime';
import UpcomingAnime from './pages/UpcomingAnime';
import TopAnimeProvider from './context/TopAnimeContext';
import OngoingProvider from './context/OngoingContext';
import UpcomingProvider from './context/UpcomingContext';

function App() {
    return (
        <div className='w-full max-w-screen-2xl'>
            <BrowserRouter>
                <GlobalProvider>
                    <OngoingProvider>
                        <UpcomingProvider>
                            <GenreProvider>
                                <TopAnimeProvider>
                                    <Loading />
                                    <Navbar />
                                    <Routes>
                                        <Route path='/' element={<Home />} />
                                        <Route
                                            path='/ongoing-anime'
                                            element={<CurrentAnime />}
                                        />
                                        <Route
                                            path='/upcoming-anime'
                                            element={<UpcomingAnime />}
                                        />
                                        <Route
                                            path='/top-anime'
                                            element={<TopAnime />}
                                        />
                                        <Route
                                            path='/anime/:animeId/:animeName'
                                            element={<AnimeDetail />}
                                        />
                                        <Route
                                            path='/anime/character/:characterId/:characterName'
                                            element={<CharacterDetail />}
                                        />
                                        <Route
                                            path='/anime/search/:query'
                                            element={<SearchAnime />}
                                        />
                                        <Route
                                            path='/genres'
                                            element={<Genres />}
                                        />
                                    </Routes>
                                    <Footer />
                                </TopAnimeProvider>
                            </GenreProvider>
                        </UpcomingProvider>
                    </OngoingProvider>
                </GlobalProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
