import { Container, Grid, Paper } from "@mui/material";
import PhotoProfile from "./PhotoProfile";

const ProfilePage = () => {
  return (
    <>
      <Container>
        <Paper
          elevation={1}
          sx={{
            minHeight: { xs: "40vh", md: "90vh" },
            borderRadius: "16px",
          }}
        >
          <Grid container columns={10} mt={10}>
            <PhotoProfile />
            {/* <Grid item xs={0} md={1} /> */}
            {/* <InfoProfile /> */}
          </Grid>
        </Paper>
      </Container>
    </>
  );
};

export default ProfilePage;
