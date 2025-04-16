import React, { useEffect, useState } from 'react';
import SignIn from './SignIn';
import Home from './pages/Home';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return user ? <Home user={user} /> : <SignIn />;

}

export default App;
