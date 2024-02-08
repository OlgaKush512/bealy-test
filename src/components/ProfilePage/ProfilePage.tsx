import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../slices/authSlice";
import { Account } from "../LoginForm/LoginForm";
import MainLayout from "../Layouts/MainLayout";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userProfilesString = localStorage.getItem("userProfiles");
  const userProfiles = userProfilesString
    ? JSON.parse(userProfilesString)
    : null;

  const userProfile = userProfiles?.find(
    (profile: Account) => profile.username === username
  );
  const profileImage = userProfile ? userProfile.profileImage : null;
  const description = userProfile ? userProfile.description : "";

  const handleChat = () => {
    dispatch(setCurrentUser(username));
    navigate(`/chat`);
  };

  return (
    <>
      <MainLayout />
      <Container>
        <Paper
          elevation={1}
          sx={{
            minHeight: { xs: "40vh", md: "50vh" },
            borderRadius: "16px",
          }}
        >
          <Grid container>
            <Grid item xs={5}>
              <Box
                sx={{
                  minHeight: { xs: "40vh", md: "50vh" },
                  paddingX: 3,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "16px",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={1} />
            <Grid
              item
              xs={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Stack spacing={2}>
                <Stack direction="row" spacing={2}>
                  <Typography variant="button">username:</Typography>
                  <Typography>{username}</Typography>
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Typography variant="button">description:</Typography>
                  <Typography>{description}</Typography>
                </Stack>
                <Button variant="contained" onClick={handleChat}>
                  Let's Chat
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
