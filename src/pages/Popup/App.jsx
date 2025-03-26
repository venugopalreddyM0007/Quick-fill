import React, { useEffect, useState } from 'react';
import Auth from './Auth';
import Popup from './Popup';
import { supabase } from '../supabase';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const updateSessionState = () => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });
  };

  useEffect(() => {
    updateSessionState();
  }, []);

  if (loading) {
    return (
      <span className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 loading loading-ring loading-lg" />
    );
  }
  return (
    <div className="p-2 min-w-[300px] min-h-36">
      {session ? <Popup /> : <Auth onUserLoggedIn={updateSessionState} />}
    </div>
  );
}

export default App;
