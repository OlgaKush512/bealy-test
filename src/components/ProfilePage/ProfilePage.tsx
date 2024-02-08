import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const profileImage = useSelector((state) => {
    const userProfiles = state.accounts.accounts;
    const userProfile = userProfiles.find(
      (profile) => profile.username === username
    );

    return userProfile ? userProfile.profileImage : null;
  });
  const description = useSelector((state) => {
    const userProfiles = state.accounts.accounts;
    const userProfile = userProfiles.find(
      (profile) => profile.username === username
    );

    return userProfile ? userProfile.description : "";
  });

  const handleChat = () => {
    navigate(`/chat`);
  };

  return (
    <>
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
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: "80%", md: "80%" },
                    height: { xs: "80%", md: "80%" },
                  }}
                  src={profileImage}
                />
              </Box>
            </Grid>
            <Stack>
              <Stack direction="row">
                <Typography>username:</Typography>
                <Typography>{username}</Typography>
              </Stack>
              <Stack direction="row">
                <Typography>description:</Typography>
                <Typography>{description}</Typography>
              </Stack>
              <Button onClick={handleChat}>Let's Chat</Button>
            </Stack>
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
