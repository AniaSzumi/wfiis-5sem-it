import { Table, TableCell, TableHead, TableRow, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useOutletContext } from 'react-router-dom';
Chart.register(...registerables);

function List({ url, dbName, getLocalData }) {
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [temps, setTemps] = useState([]);
  const [loggedIn, setLoggedIn] = useOutletContext();

  useEffect(() => {
    if (navigator.onLine) {
      fetch(url+"weather/", {mode: 'cors'})
        .then((res) => res.json())
        .then((d) => setData(d))
        .catch((err) => console.log(err));
    }
    else {
      getLocalData()
        .then((d) => setData(d))
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    let obj = [];
    data.forEach(element => {
      obj.push({label: element.date, data: element.temperature});
    });
    obj.sort((a,b) => new Date(a.label).getTime()-new Date(b.label).getTime());
    let sortedDates = [];
    let sortedTemps = [];
    obj.forEach(o => {
      sortedDates.push(o.label);
      sortedTemps.push(o.data);
    })
    setDates(sortedDates);
    setTemps(sortedTemps);
  }, [data]);

  return ( 
    <>
  { loggedIn ? 
  (dates.length > 0 && temps.length > 0) &&
  <Stack direction="column" justifyContent="center" alignItems="center" spacing={4} style={{maxWidth: "1000px", margin: "20px auto"}}>
    <Line
    data={{
      labels: dates,
      datasets:  [{
        label: "Temperatura",
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: temps,
      }]
    }}
    options={{
      title:{
        display:true,
        text:'Average Rainfall per month',
        fontSize:20
      }
    }}
    />
    <Table >
      <TableHead>
        <TableRow>
          <TableCell>Miejsce</TableCell>
          <TableCell>Data</TableCell>
          <TableCell>Czas</TableCell>
          <TableCell>Temperatura</TableCell>
          <TableCell>Opis</TableCell>
        </TableRow>
        {data.map((d) => (
          <TableRow key={d.place+d.date+d.time}>
            <TableCell>{d.place}</TableCell>
            <TableCell>{d.date}</TableCell>
            <TableCell>{d.time}</TableCell>
            <TableCell>{d.temperature}</TableCell>
            <TableCell>{d.description}</TableCell>
          </TableRow>
        ))}
      </TableHead>
    </Table>
  </Stack>
    :
    <Typography variant="h4" mt={6}>Nie masz dostępu do tej strony</Typography>
  }
  </>
  )
}

export default List;
