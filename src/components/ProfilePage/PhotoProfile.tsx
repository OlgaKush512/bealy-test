import { Avatar, Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const PhotoProfile = () => {
  const { username } = useParams();
  console.log("username", username);

  const profileImage = useSelector((state) => {
    const userProfiles = state.accounts.accounts;
    const userProfile = userProfiles.find(
      (profile) => profile.username === username
    );

    return userProfile ? userProfile.profileImage : null;
  });

  console.log("profileImage", profileImage);

  return (
    <div>
      <Grid item xs={10} sm={4}>
        <Box
          sx={{
            borderRadius: "16px 0 0 16px",
            display: "flex",
            height: "80vh",
            minHeight: { xs: "40vh", sm: "90vh" },
            backgroundSize: "cover",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid container columns={4}>
            <Grid item xs={4} display="flex" justifyContent="center">
              <Avatar
                sx={{
                  width: { xs: "80%", md: "80%" },
                  height: "auto",
                }}
                src={profileImage}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
};

export default PhotoProfile;
