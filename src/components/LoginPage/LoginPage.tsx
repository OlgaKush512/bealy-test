import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addAccount } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Account } from "../LoginForm/LoginForm";
import MainLayout from "../Layouts/MainLayout";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError("");
    const storedAccounts = localStorage.getItem("userProfiles");
    if (storedAccounts) {
      const accounts = JSON.parse(storedAccounts);
      const foundAccount = accounts.find(
        (account: Account) => account.username === login
      );
      if (foundAccount) {
        dispatch(addAccount(foundAccount));
        navigate(`/profile/${login}`);
      } else {
        setError("Login not found");
      }
    }
  };

  return (
    <div>
      <MainLayout />
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
