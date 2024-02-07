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
import { addAccount } from "../slices/authSlice";
import { useDispatch } from "react-redux";

export interface Account {
  profileImage: File | null;
  username: string;
  description: string;
}

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState<Account>({
    profileImage: null,
    username: "",
    description: "",
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
      setProfileData((prevProfileData) => ({
        ...prevProfileData,
        profileImage: file,
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
    const imageUrl = profileImage ? URL.createObjectURL(profileImage) : "";

    const reader = new FileReader();

    reader.onload = (event) => {
      localStorage.setItem(
        profileWithoutImage.username,
        JSON.stringify({
          profileImage: event.target.result,
          ...profileWithoutImage,
        })
      );
    };
    if (profileImage) {
      reader.readAsDataURL(profileImage);
    } else {
      localStorage.setItem(
        profileWithoutImage.username,
        JSON.stringify(profileWithoutImage)
      );
    }

    handleClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} aria-labelledby="login">
        <DialogTitle id="alert-dialog-title">{"Register"}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <input
              accept="image/*"
              id="profilePic"
              name="profilePic"
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="profilePic">
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
