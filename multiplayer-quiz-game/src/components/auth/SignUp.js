import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { createUser } from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        Quiz
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function validateEmail(email) {
  return /\S+@gmail\.com$/.test(email);
}

function validatePassword(password) {
  return password.length > 8;
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();
  const [errors, setErrors] = React.useState({});
  const [user,setUser] = React.useState({firstname:"",
                                        lastname:"", 
                                        email:   "",
                                        password: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = {};

    if (!user.firstname) {
      validationErrors.firstname = 'First name is required';
    }

    if (!user.lastname) {
      validationErrors.lastname = 'Last name is required';
    }

    if (!user.email) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(user.email)) {
      validationErrors.email = 'Please enter a valid Gmail address';
    }

    if (!user.password) {
      validationErrors.password = 'Password is required';
    } else if (!validatePassword(user.password)) {
      validationErrors.password = 'Password must be at least 8 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

  
    createUser(user);
    setUser({
      firstname: '',
      lastname: '',
      email: '',
      password: '',
    });
    navigate("signin");

  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Typography component="h3" variant="h5">
            Welcome to <b>WinQ</b>
          </Typography>
          <Typography component="h3" variant="h5">
            Play Entertainment Trivia Quizes
          </Typography>
          <Typography component="h3" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={user.firstname}
                  onChange={(e) => setUser((prevUser) => ({ ...prevUser, firstname: e.target.value }))}
                  error={!!errors.firstname}
                  helperText={errors.firstname}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={user.lastname}
                  onChange={(e) => setUser((prevUser) => ({ ...prevUser, lastname: e.target.value }))}
                  error={!!errors.lastname}
                  helperText={errors.lastname}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={(e) => setUser((prevUser) => ({ ...prevUser, email: e.target.value }))}
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={user.password}
                  onChange={(e) => setUser((prevUser) => ({ ...prevUser, password: e.target.value }))}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>
            </Grid>
            <Link to="app">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            </Link>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}