import {useContext} from "react";
import {Avatar, Button, Container, Stack} from '@mui/material';

import {CredentialContext, Icon, icons, useCredential} from "../core";

const HeaderBlock = ({
  auth,
  onNavigateToHomepage,
  onNavigateToLogin,
  onNavigateToFavorites,
  onNavigateToManagement,
  onLogoutSuccess
}: {
  auth: boolean,
  onNavigateToHomepage: () => void,
  onNavigateToLogin: () => void,
  onNavigateToFavorites: () => void,
  onNavigateToManagement: () => void,
  onLogoutSuccess: () => void
}) => {
  const credential = useCredential();
  const {removeToken} = useContext(CredentialContext)

  return <Container
    disableGutters
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      pl: 4,
      pr: 4,
      pt: 2,
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      justifyContent={auth ? "flex-start" : "center"}
      spacing={1}
      flexGrow={1}
    >
      <Avatar
        alt="Bookstore"
        src="/asset/logo.png"
        onClick={(e) => {
          e.preventDefault();

          onNavigateToHomepage();
        }}
        sx={{
          cursor: "pointer"
        }}
      />

      <Button
        variant="text"
        color="inherit"
        size="large"
        onClick={(e) => {
          e.preventDefault();

          onNavigateToHomepage();
        }}
        sx={{
          display: {
            xs: "none",
            sm: "block"
          }
        }}
      >
        Bookstore
      </Button>
    </Stack>

    {auth && <Stack
      direction="row"
      alignItems="center"
      spacing={3}
    >
      {credential && !credential.is_admin && <Button
        variant="text"
        color="inherit"
        size="small"
        startIcon={<Icon name={icons.states.liked}/>}
        onClick={(e) => {
          e.preventDefault();

          onNavigateToFavorites();
        }}
      >
        My favorites
      </Button>}

      {credential && credential.is_admin && <Button
        variant="text"
        color="inherit"
        size="small"
        startIcon={<Icon name={icons.actions.manage}/>}
        onClick={(e) => {
          e.preventDefault();

          onNavigateToManagement();
        }}
      >
        Management
      </Button>}

      {!credential
        ? <Button
          variant="text"
          color="inherit"
          size="large"
          startIcon={<Icon name={icons.actions.login}/>}
          onClick={(e) => {
            e.preventDefault();

            onNavigateToLogin();
          }}
        >
          Login
        </Button>
        : <Button
          variant="text"
          color="inherit"
          size="small"
          startIcon={<Icon name={icons.actions.logout}/>}
          onClick={(e) => {
            e.preventDefault();

            removeToken();

            onLogoutSuccess();
          }}
        >
          Logout
        </Button>}
    </Stack>}
  </Container>
}

export default HeaderBlock;
