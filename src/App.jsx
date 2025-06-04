import { useContext, useEffect } from 'react';
import Routing from './Routing.jsx';
import { DataContext } from './components/DataProvider/DataProvider.jsx';
import { type } from './Utility/action.type.jsx';
import { auth } from './Utility/firebase.js'; 
function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        dispatch({
          type: type.SET_USER,
          user: authUser,
        });
      } else {
        // User is signed out
        dispatch({
          type: type.SET_USER,
          user: null,
        });
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [dispatch]);

  return <Routing />;
}

export default App;
