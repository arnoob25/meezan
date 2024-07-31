import './App.css'
import MainPage from './pages/main-page/MainPage';
import SpacesPage from './pages/spaces-page/SpacesPage';
import TodayPage from './pages/today-page/TodayPage';

function App() {

    return (
        <div className="bg-light2 text-dark1 relative h-screen"> {/* TODO: it should not be scrollable */}
            {/* <SpacesPage /> */}
            <MainPage/>
        </div>
    )
}

export default App
