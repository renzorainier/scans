import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const ProtectedContent = () => {
  const [password, setPassword] = useState("");
  const [showContent, setShowContent] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (password === "mysecret") {
      setShowContent(true);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      {!showContent && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" gutterBottom>
            Enter Password
          </Typography>
          <form onSubmit={handleFormSubmit}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              fullWidth
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </form>
        </Box>
      )}
      {showContent && (
        <Box>
          <Typography variant="h4" gutterBottom>
            Protected Content
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            This is protected content that is only visible once you enter the correct password.
          </Typography>
          <img src="https://picsum.photos/400/300" alt="Protected Content" />
        </Box>
      )}
    </Box>
  );
};

export default ProtectedContent;
