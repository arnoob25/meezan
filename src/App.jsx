import './App.css'
import MainPage from './pages/main-page/MainPage';
import useAuthContext from './pages/auth-page/helpers/contexts';
import Login from './pages/auth-page/Login';
import { useEffect } from 'react';
import { supabase } from './lib/QueryClient';

function App() {
const {user,setUser} = useAuthContext();
useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session)
    })

    return () => subscription.unsubscribe()
  }, [])

    return (
        <div className="bg-light2 text-dark1 relative h-screen"> {/* TODO: it should not be scrollable */}
            {!user?<Login/>:<MainPage/>}
        </div>
    )
}

export default App
