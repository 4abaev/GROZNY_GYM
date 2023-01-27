import React, { useState, useEffect } from "react";
import { authSignIn } from "../../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SignUp from "../SignUp/SignUp";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import styles from "./SignIn.module.scss";

const SignIn = () => {
  const error = useSelector((state) => state.users.error);
  const loading = useSelector((state) => state.users.loading);
  const successfully = useSelector((state) => state.users.successfully);
  const token = localStorage.getItem("token");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSetLogin = (e) => {
    setLogin(e.target.value);
  };

  const handleSetPassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (token) {
      window.location.href = "/";
    }
  }, [token]);

  function Copyright(props) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Grozny Gym
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    );
  }

  const theme = createTheme();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSignIn({ login, password }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://all-aforizmy.ru/wp-content/uploads/2022/06/20190918135414-tommy-shelby-peaky-blinders.jpeg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Войти в личный кабинет
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                autoFocus
                required
                margin="normal"
                fullWidth
                id="Login"
                label="Login"
                name="Login"
                type="text"
                autoComplete="Login"
                onChange={handleSetLogin}
                value={login}
              />
              <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleSetPassword}
                value={password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Запомнить меня"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Войти
              </Button>
              <div className={styles.error}>
                {error ? (
                  error
                ) : (
                  <p className={styles.successfully}>{successfully}</p>
                )}
              </div>
              {loading ? (
                <div className={styles.loader}>
                  <div className={styles.scanner}>
                    <span>Loading...</span>
                  </div>
                </div>
              ) : null}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Забыли пароль?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/registration" element={<SignUp />} variant="body2">
                    {"Нет аккаунта? Зарегистрироваться"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default React.memo(SignIn);
