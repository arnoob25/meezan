import './App.css'
import useAuthContext from './pages/auth-page/helpers/contexts';
import Login from './pages/auth-page/Login';
import MainPage from './pages/main-page/MainPage';
import SpacesPage from './pages/spaces-page/SpacesPage';
import TodayPage from './pages/today-page/TodayPage';

function App() {
    const {user} = useAuthContext();

    return (
        <div className="bg-light2 text-dark1 relative h-screen"> {/* TODO: it should not be scrollable */}
            {user?<MainPage/>:<Login/>}
        </div>
    )
}

export default App
