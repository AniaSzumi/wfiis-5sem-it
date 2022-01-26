import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


function Navbar({loggedIn, setLoggedIn}) {
  let navigate = useNavigate();
  const logout = () => {
    setLoggedIn(false);
    window.sessionStorage.removeItem("loggedIn");
    navigate("/");
  }
  return <Stack direction="row" justifyContent="center" spacing={2} mt={4}>
    {loggedIn ? 
    <>
    <Link to="form"><Button variant='outlined'>Dodaj dane pogodowe</Button></Link>
    <Link to="list"><Button variant='outlined'>Zobacz dane pogodowe</Button></Link>
    <Button variant="outlined" onClick={logout}>Wyloguj się</Button>
    </>
    :
    <>
    <Link to="login"><Button variant="outlined">Zaloguj się</Button></Link>
    <Link to="register"><Button variant="outlined">Zarejestruj się</Button></Link>
    </>
    }
  </Stack>;
};

export default Navbar;
