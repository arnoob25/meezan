import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/QueryClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { user, session }, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Error handling auth callback:', error.message);
      } else {
        console.log('User:', user);
        console.log('Session:', session);
        // You can save the user and session data to your state management here
      }
      navigate('/'); // Redirect to the home page or another protected route
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div>
      <h1>Authenticating...</h1>
    </div>
  );
};

export default AuthCallback;
