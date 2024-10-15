import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReCAPTCHA from "react-google-recaptcha"; 
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert
} from '@mui/material';

const MySwal = withReactContent(Swal);

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaValue) {
      setErrorMessage('Por favor, resuelve el reCAPTCHA.');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        user: username,
        password,
        captchaValue,
      });

      const { tipo } = response.data;
      localStorage.setItem('usuario', JSON.stringify(response.data));
      let ruta = '/';
      let mensaje = 'Has iniciado sesión correctamente.';

      switch (tipo) {
        case "cliente":
          ruta = '/cliente';  
          break;
        case "Administrativo": 
          ruta = '/admin'; 
          break;
        default:
          setErrorMessage('Tipo de usuario desconocido');
          setOpenSnackbar(true);
          return;
      }

      MySwal.fire({
        position: 'center',
        icon: 'success',
        title: mensaje,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate(ruta);  
      });
    } catch (error) {
      if (error.response) {
        setErrorMessage('Usuario o contraseña incorrectos');
      } else {
        setErrorMessage('Error al iniciar sesión. Inténtalo de nuevo más tarde.');
      }
      setOpenSnackbar(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          backgroundColor: '#e0f7fa', 
          padding: 3, 
          borderRadius: 2, 
          boxShadow: 3 
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 3 }}>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <TextField
            label="Usuario"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box sx={{ my: 2 }}>
            <ReCAPTCHA
              sitekey="6LdywWEqAAAAABaqr6UOH4sdezdbC5qgtrSf1Ya_" 
              onChange={(value) => setCaptchaValue(value)}
            />
          </Box>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth
          >
            Iniciar Sesión
          </Button>
          <Link to="/recuperar_password" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ mt: 2 }}>
              ¿Olvidaste la contraseña?
            </Typography>
          </Link>
          <Link to="/registro" style={{ textDecoration: 'none' }}>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Regístrate
            </Typography>
          </Link>
        </form>
        <Snackbar 
          open={openSnackbar} 
          autoHideDuration={6000} 
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert 
            onClose={() => setOpenSnackbar(false)} 
            severity="error" 
            sx={{ width: '100%' }}
          >
            {errorMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default Login;
