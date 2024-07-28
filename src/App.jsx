import './App.css'
import SpacesPage from './pages/spaces-page/SpacesPage'
import TodayPage from './pages/today-page/TodayPage'

function App() {

  return (
    <div className="bg-light2 text-dark1 relative min-h-[100svh]"> {/* TODO: it should not be scrollable */}
      <SpacesPage />
    </div>
  )
}

export default App
