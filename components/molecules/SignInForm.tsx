"use client";

import { useState } from "react";
import { Box, Button, Divider, Grid, TextField } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "../atoms";

import { useAuth } from "@/hooks";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signInWithCredentials, signInWithGoogle } = useAuth();

  const handleOnEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);
  };

  const handleOnPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = event.target;
    setPassword(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signInWithCredentials({ email, password });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            inputProps={{
              "data-testid": "txtEmail",
            }}
            margin="normal"
            required
            fullWidth
            value={email}
            onChange={handleOnEmailChange}
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            inputProps={{
              "data-testid": "txtPassword",
            }}
            margin="normal"
            required
            fullWidth
            value={password}
            onChange={handleOnPasswordChange}
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
      </Grid>
      <Button
        data-testid={'btnLoginSubmit'}
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt: 3, mb: 2 }}
        disabled={!email || !password}
      >
        Sign In
      </Button>
      <Divider />
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        sx={{ mt: 2, mb: 2 }}
        onClick={signInWithGoogle}
      >
        Sign In with Google
      </Button>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Link href="/reset">Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link href="/signup">{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
