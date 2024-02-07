import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Account } from "../LoginForm/LoginForm";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    const account = localStorage.getItem(login);
    if (account) {
      const info = JSON.parse(account);

      dispatch(addAccount({ username: login, ...info }));
      navigate(`/profile/${login}`);
    } else {
      setError("Login not found");
    }
  };

  return (
    <div>
      <Typography variant="h4">Login Page</Typography>
      <TextField
        autoComplete="off"
        label="Enter your login"
        variant="outlined"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default LoginPage;
