import React, {useContext} from "react";
import {useMutation} from '@tanstack/react-query'
import {Box, Stack, TextField, Typography} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

import {processRegistration} from "../service/AuthService"
import {UserPasswordType, UserUsernameType} from "../type";
import {CredentialContext} from "../core";

export const AuthRegistrationPage = ({
  onRegistrationSuccess
}: {
  onRegistrationSuccess: () => void
}) => {
  const {setToken} = useContext(CredentialContext);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repeat, setRepeat] = React.useState('');

  const mutation = useMutation({
    mutationFn: async ({
      username,
      password,
      repeat
    }: {
      username: UserPasswordType,
      password: UserPasswordType
      repeat: UserPasswordType
    }) => {
      const token = await processRegistration(username, password, repeat);

      setToken(token);
    },
    onSuccess: () => {
      onRegistrationSuccess();
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    mutation.mutate({
      username: data.get('username') as UserUsernameType,
      password: data.get('password') as UserPasswordType,
      repeat: data.get('repeat') as UserPasswordType,
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
        id="username"
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
        autoComplete="new-password"
      />
      <TextField
        value={repeat}
        onChange={(event) => setRepeat(event.target.value)}
        margin="normal"
        required
        fullWidth
        name="repeat"
        label="Repeat Password"
        type="password"
        autoComplete="new-password"
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
        disabled={!username || !password || !repeat}
        variant="contained"
        sx={{mt: 2}}
      >
        Create Account
      </LoadingButton>
    </Box>
  </Stack>
}
