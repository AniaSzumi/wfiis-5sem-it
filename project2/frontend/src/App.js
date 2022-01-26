import './App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(75,192,192,1)",
    },
  },
});

function App({ url, dbName, getLocalData, saveToServer }) {
  const [loggedIn, setLoggedIn] = useState(window.sessionStorage.getItem("loggedIn") || false);

  const refresh = () => {
    window.location.reload(true);
  }

  const synchronizeData = () => {
    alert("Jesteś online, przesyłanie danych, proszę odświeżyć stronę");
    getLocalData().then((data) => {
      console.log("data: ",data);
      data.forEach((d) => {
        console.log("d: ",d)
        saveToServer(d);
      });
    })
    .then(() => clearLocalStore())
    // .then(refresh)
  }

  useEffect(() => {
    window.addEventListener('online', synchronizeData);
    window.addEventListener('offline', refresh);
    
    return () => {
      window.removeEventListener('online', synchronizeData);
      window.removeEventListener('offline', refresh);
    }
  }, [])

  function clearLocalStore() {
    let request = window.indexedDB.open(dbName);
    request.onerror = (event) => {
      console.error("Database not opened");
    }
    request.onsuccess = (event) => {
      let db = event.target.result;
      let store = db.transaction(dbName, "readwrite").objectStore(dbName);
      let c = store.clear();
      c.onsuccess = () => {
        console.log("Wyczyszczono bazę danych przeglądarki");
      };
      c.onerror = () => {
        console.log("Nie udało się wyczyścić")
      };
    }
  }


  return (
    <ThemeProvider theme={theme}>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
    </ThemeProvider>
  );
}

export default App;
