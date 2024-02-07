import { Button, Typography } from "@mui/material";
import MainLayout from "../Layouts/MainLayout";
import { useEffect, useState } from "react";
import { Account } from "../LoginForm/LoginForm";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    const storedAccounts = localStorage.getItem("userProfiles");
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts));
    }
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  console.log("isLoggedIn", accounts);
  return (
    <div>
      <MainLayout />
      {accounts?.length > 0 ? (
        <>
          <Typography>You can Log In</Typography>
          <Button
            variant="contained"
            sx={{ fontSize: "30px", opacity: "0.9" }}
            onClick={handleLoginClick}
          >
            Log In
          </Button>
        </>
      ) : (
        <Typography>No accounts yet. Create your first account.</Typography>
      )}
    </div>
  );
};

export default LandingPage;
