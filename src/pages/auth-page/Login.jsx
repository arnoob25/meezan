import React from 'react';
import { handleGoogleSignin } from './helpers/AuthFunctions';
import useAuthContext from './helpers/contexts';

function Login() {


  return (
    <div>
      <button onClick={handleGoogleSignin}>Sign in with Google</button>
    </div>
  );
}

export default Login;
