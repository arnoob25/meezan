import './App.css'
import SpacesPage from './pages/spaces-page/SpacesPage'
import TodayPage from './pages/today-page/TodayPage'

function App() {

  return (
    <div className="bg-light2 text-dark1 min-h-[100svh] overflow-hidden"> {/* TODO: it should not be scrollable */}
      <SpacesPage />
    </div>
  )
}

export default App
