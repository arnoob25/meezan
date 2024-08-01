import React, { useContext } from 'react'
import { handleGoogleSignin } from './helpers/AuthFunctions'
import useAuthContext from './helpers/contexts'

function Login() {
  const {setUser} = useAuthContext();
  const signIn = async ()=>{
    const {user,session} = await handleGoogleSignin();
    setUser(user);
  }
  return (
    <div>
      <button onClick={signIn}>Sign in with Google</button>
    </div>
  )
}

export default Login