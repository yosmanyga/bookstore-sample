import React, {useContext} from "react";
import {useMutation} from '@tanstack/react-query'
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

import {processLogin} from "../service/AuthService"
import {CredentialContext} from "../core";
import {UserPasswordType, UserUsernameType} from "../type";

export const AuthLoginPage = ({
  onLoginSuccess,
  onNavigateToRegistration,
}: {
  onLoginSuccess: () => void,
  onNavigateToRegistration: () => void,
}) => {
  const {setToken} = useContext(CredentialContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const mutation = useMutation({
    mutationFn: async ({
      username,
      password
    }: { username: UserPasswordType, password: UserPasswordType }) => {
      const token = await processLogin(username, password);

      setToken(token);
    },
    onSuccess: () => {
      onLoginSuccess();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    mutation.mutate({
      username: data.get('username') as UserUsernameType,
      password: data.get('password') as UserPasswordType
    });
  };

  return <Stack
    direction='column'
    alignItems='center'
  >
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      marginTop={2}
    >
      <TextField
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        margin="normal"
        required
        fullWidth
        label="Username"
        name="username"
        autoComplete="username"
        autoFocus
      />
      <TextField
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
      />

      <Stack>
        {mutation.isError && <Typography
          variant="body2"
          color="error"
          marginTop={2}
        >
          {mutation.error.message}
        </Typography>}
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        loading={mutation.isPending}
        disabled={!username || !password}
        variant="contained"
        sx={{mt: 2}}
      >
        Sign In
      </LoadingButton>
    </Box>

    <Stack
      direction='row'
      alignItems='center'
      justifyContent='center'
      spacing={1}
      marginTop={2}
    >
      <Button
        onClick={onNavigateToRegistration}
        variant="text"
      >
        New here? Create an account
      </Button>
    </Stack>
  </Stack>
}
