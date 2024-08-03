import './App.css'
import MainPage from './pages/main-page/MainPage';

function App() {

    return (
        <div className="bg-light2 text-dark1 relative h-screen overflow-hidden"> {/* TODO: it should not be scrollable */}
            <MainPage/>
        </div>
    )
}

export default App;
