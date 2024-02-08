import { ChangeEvent, FormEvent, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

export interface Account {
  profileImage: File | null;
  username: string;
  description: string;
  messageHistory: string[];
}

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [profileData, setProfileData] = useState<Account>({
    profileImage: null,
    username: "",
    description: "",
    messageHistory: [],
  });

  const [open] = useState<boolean>(true);

  const handleClose = () => {
    onClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        alert("Please select an image smaller than 500 KB.");
        e.target.value = "";
        return;
      }
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        profileImage: file || null,
      }));
    } else {
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        profileImage: null,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { profileImage, ...profileWithoutImage } = profileData;

    if (profileImage) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target) {
          const imageUrl = event.target.result;
          const accounts: Account[] = JSON.parse(
            localStorage.getItem("userProfiles") || "[]"
          );
          accounts.push({
            ...profileWithoutImage,
            profileImage: imageUrl,
          });
          localStorage.setItem("userProfiles", JSON.stringify(accounts));
          handleClose();
        }
      };
      reader.readAsDataURL(profileImage);
    } else {
      const accounts: Account[] = JSON.parse(
        localStorage.getItem("userProfiles") || "[]"
      );
      accounts.push({
        ...profileWithoutImage,
        profileImage: null,
      });
      localStorage.setItem("userProfiles", JSON.stringify(accounts));
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="login">
        <DialogTitle id="alert-dialog-title">{"Register"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <input
              accept="image/*"
              id="profileImage"
              name="profileImage"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profileImage">
              <Button variant="contained" component="span">
                Upload Profile Picture
              </Button>
            </label>
            <TextField
              required
              autoFocus
              variant="outlined"
              margin="dense"
              id="username"
              name="username"
              label="Username"
              value={profileData.username}
              onChange={handleInputChange}
            />
            <TextField
              required
              autoFocus
              variant="outlined"
              margin="dense"
              id="description"
              name="description"
              label="Description"
              multiline
              rows={4}
              value={profileData.description}
              onChange={handleInputChange}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginForm;
