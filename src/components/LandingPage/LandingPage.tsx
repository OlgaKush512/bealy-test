import { Button } from "@mui/material";
import MainLayout from "../Layouts/MainLayout";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <MainLayout />
      <>
        <Button
          variant="contained"
          sx={{ fontSize: "30px", opacity: "0.9" }}
          onClick={handleLoginClick}
        >
          Log In
        </Button>
      </>
    </div>
  );
};

export default LandingPage;
