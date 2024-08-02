import {ReactNode} from "react";
import {Container} from '@mui/material';

import HeaderBlock from "./HeaderBlock";

const Layout = ({
  auth,
  onNavigateToHomepage,
  onNavigateToFavorites,
  onNavigateToManagement,
  onNavigateToLogin,
  onLogoutSuccess,
  children
}: {
  auth: boolean,
  onNavigateToHomepage: () => void,
  onNavigateToFavorites: () => void,
  onNavigateToManagement: () => void,
  onNavigateToLogin: () => void,
  onLogoutSuccess: () => void
  children: ReactNode,
}) => {
  return <Container disableGutters>
    <HeaderBlock
      auth={auth}
      onNavigateToHomepage={onNavigateToHomepage}
      onNavigateToFavorites={onNavigateToFavorites}
      onNavigateToManagement={onNavigateToManagement}
      onNavigateToLogin={onNavigateToLogin}
      onLogoutSuccess={onLogoutSuccess}
    />
    <Container
      sx={{pt: 2, pb: 2}}
    >
      {children}
    </Container>
  </Container>
}

export default Layout;
