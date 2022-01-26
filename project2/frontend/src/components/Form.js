import { Button, Stack, TextField, Typography } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import { useState } from 'react';
import { useNavigate, useOutletContext } from "react-router-dom";

function Form({ url, dbName, saveToServer }) {
  const [place, setPlace] = useState("")
  const [date, setDate] = useState(Date.now())
  const [time, setTime] = useState(Date.now())
  const [temperature, setTemperature] = useState()
  const [description, setDescription] = useState("")
  const [loggedIn, setLoggedIn] = useOutletContext();
  let navigate = useNavigate();

  const saveWeather = () => {
    if (place && date && time && temperature && description) {
      let weatherData = {
        place: place,
        date: new Date(date).toISOString().split("T")[0],
        time: new Date(time).toISOString().split("T")[1].substring(0, 5),
        temperature: temperature,
        description: description
      };
      if (navigator.onLine) {
        saveToServer(weatherData);
      } else {
        let max = 1000;
        let min = 100;
        weatherData.id = Math.floor(Math.random()*(max-min)+min);
        saveLocalData(weatherData);
      }
      resetData();
      navigate("/");
    } else {
      alert("Trzeba wypełnić wszystkie pola")
    }
  }


  
  const saveLocalData = (data) => {
    if(!window.indexedDB) {
      alert("Przeglądarka nie wspiera IndexedDB");
    } else {
      let request = window.indexedDB.open(dbName);
      request.onerror = (event) => {
        console.error("Database not opened");
      }
      request.onupgradeneeded = (event) => {
        let db = event.target.result;
        db.createObjectStore(dbName, {keyPath: "id", autoIncrement: true});
      }
      request.onsuccess = (event) => {
        let db = event.target.result;
        let store = db.transaction(dbName, "readwrite").objectStore(dbName);
        db.onerror = (event) => {
          console.error("Database error: ", event.target.errorCode);
        }
        store.add(data).onsuccess = (event) => {
          console.log("Dodano do lokalnej bazy danych");
        }
      }
    }
  }
  
  const resetData = () => {
    setPlace("")
    setDate(Date.now())
    setTime(Date.now())
    setTemperature()
    setDescription("")
  }

  return (
    <>
    {loggedIn ? 
    <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack direction="column" spacing={2} alignItems="center" mt={4}>
      <Stack direction="column" spacing={2} alignItems="stretch" mt={2} style={{width: '20%', minWidth: '200px'}}>
        <TextField id="place" label="Miejsce" variant="outlined" value={place} onChange={(e) => setPlace(e.target.value)} />
        <DatePicker label="Data" value={date} onChange={(newDate) => setDate(newDate)}  renderInput={(props) => <TextField {...props} />} />
        <TimePicker
          label="Godzina"
          value={time}
          onChange={(newTime) => setTime(newTime)}
          renderInput={(params) => <TextField {...params} />}
        />
        <TextField id="temperature" label="Temperatura (&deg;C)" value={temperature} onChange={(e) => setTemperature(e.target.value)} type="number" variant="outlined" />
        <TextField id="desc" label="Pogoda" value={description} onChange={(e) => setDescription(e.target.value)} variant="outlined" />
      </Stack>
      <Button variant='contained' onClick={saveWeather}>Prześlij</Button>
    </Stack>
    </LocalizationProvider>
    :
      <Typography variant="h4" mt={6}>Nie masz dostępu do tej strony</Typography>
    }
    </>
  );
}

export default Form;
