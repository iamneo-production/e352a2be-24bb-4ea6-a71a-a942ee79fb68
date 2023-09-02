
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { findUserByEmail } from '../../services/UserServices';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Alert from '@mui/material/Alert';
import { useDispatch } from 'react-redux';
import { setUserName } from '../../store/user';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="">
        WinQ
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[user,updateUser] = React.useState(null);
  const[isClicked,setIsClicked] = React.useState(false);
  const[userFound,SetUserFound] = React.useState(false);
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIsClicked(true);
    let user1 = {
      email: data.get('email'),
      password: data.get('password'),
    };

  setEmailError('');
  setPasswordError('');

  // Field validations
  if (!user1.email || !user1.email.includes('@gmail.com')) {
    setEmailError('Invalid email address, Please Check it');
    return;
  }

  if (!user1.password || user1.password.length < 8) {
    setPasswordError('Password must be at least 8 characters');
    return;
  }


findUserByEmail(user1.email,user1.password)
  .then((user) => {
    if (user) {
      SetUserFound(true);
      updateUser(user);
      Cookies.set('user',JSON.stringify(user.email));
      dispatch(setUserName(user.firstname));
      navigate("/categories");
    } else {
      SetUserFound(false);
      console.log('please check the details');
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  };

//   const hideAlert = ()=>{
//       setIsClicked(false);
//   }

  return (
    <>
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={!!passwordError}
            helperText={passwordError}
            />
            {(isClicked &&(userFound === false)) &&  <Alert severity="error"> User Details not Found,Please Register first or check your details!</Alert>}
    
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </>
  );
}