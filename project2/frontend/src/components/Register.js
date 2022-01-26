import { Typography, Stack, TextField, Button } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function Register({ url }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const register = () => {
    let user = {
      username: username,
      password: password
    };
    fetch(url + "users/", {
      method: 'POST', 
      mode: 'cors', 
      body: JSON.stringify(user),
      headers: {"Content-Type": "application/json"}
    })
    .then((res) => res.text())
    .then((data) => {
      if (data > 0) { alert("Zarejestrowano użytkownika") }
    })
    .then(() => {
      setUsername("");
      setPassword("");
      navigate("../login");
    })
    .catch((err) => console.error("Error: ", err))
  }

  return <Stack direction="column" spacing={2} alignItems="center" mt={6}>
    <Typography variant="h1" style={{ fontSize: 48 }}>Zarejestruj się</Typography>
    <Stack direction="column" spacing={2} alignItems="stretch" mt={6} style={{width: '20%', minWidth: '200px'}}>
      <TextField id="username" label="Nazwa użytkownika" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField id="password" label="Hasło" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
    </Stack>
    <Button variant='contained' onClick={register}>Zarejestruj się</Button>
  </Stack>
}

export default Register;
