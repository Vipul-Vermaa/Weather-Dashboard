import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../services/firebase';
import { Box, Button, TextField, Typography, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import {useNavigate} from 'react-router-dom'

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate=useNavigate()

  const signInUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        alert('loggedIn')
        navigate('/')
      })
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
  };

  const doSignInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then(() => console.log('success'))
      .catch((err) => console.log(err));
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate onSubmit={signInUser} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Button
              onClick={doSignInWithGoogle}
              fullWidth
              variant="outlined"
              sx={{ mt: 1, mb: 2 }}
            >
              Sign In with Google
            </Button>
            <span>
              New User?
            </span>
            <Link to='/register'>
            <Button
              type="submit"
              fullWidth
              variant='outlined'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign-Up
            </Button>
            </Link>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
