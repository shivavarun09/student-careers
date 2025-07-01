import { useEffect, useState } from 'react';
import { auth } from '../../Auth/FirebaseConfig/FirebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AuthSubscibe = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("Logged in user:", user);
      } else {
        console.log("User not logged in");
      }
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  return (
    <div>
      {currentUser ? (
        <p>Welcome, {currentUser.email}</p>
      ) : (
        <p>No user logged in</p>
      )}
    </div>
  );
};

export default AuthSubscibe;