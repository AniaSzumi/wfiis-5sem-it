import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Form from './components/Form';
import List from './components/List';
import Register from './components/Register';
import Login from './components/Login';

const url = "http://127.0.0.1:5000/";
const dbName = "weather";

const saveToServer = (data) => {
  fetch(url + "weather/", {
    method: 'POST', 
    mode: 'cors', 
    body: JSON.stringify(data),
    headers: {"Content-Type": "application/json"}
  })
  .then((res) => res.text())
  .then((data) => {
    if (data > 0) { console.log("Dodano dane do servera") }
  })
  .catch((err) => console.error("Error: ", err))
}

const getLocalData = () => {
  if(!window.indexedDB) {
    alert("Przeglądarka nie wspiera IndexedDB");
  } else {
    return new Promise((resolve, reject) => {
      let request = window.indexedDB.open(dbName);
      request.onerror = (event) => {
        console.error("Database not opened");
        reject(false);
      }
      request.onupgradeneeded = (event) => {
        console.log("ugrade needed");
        event.target.transaction.abort();
        reject(false);
      }
      request.onsuccess = (event) => {
        let db = event.target.result;
        let store = db.transaction(dbName).objectStore(dbName);
        db.onerror = (event) => {
          console.error("Database error: ", event.target.errorCode);
          reject(false);
        }
        store.getAll().onsuccess = (event) => {
          event.target.result ? resolve(event.target.result) : reject(false);
        }
      }
    })
  }
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<React.StrictMode><App url={url} dbName={dbName} getLocalData={getLocalData} saveToServer={saveToServer} /></React.StrictMode>}>
        <Route path="form" element={<Form url={url} dbName={dbName} saveToServer={saveToServer} />} />
        <Route path="list" element={<List url={url} dbName={dbName} getLocalData={getLocalData} />} />
        <Route path="register" element={<Register url={url} />} />
        <Route path="login" element={<Login url={url} />} />
      </Route>
    </Routes>
  </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
