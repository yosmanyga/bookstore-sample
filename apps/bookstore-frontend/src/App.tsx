import {CredentialProvider} from "./core";
import {ThemeWrapper, Routing} from "./layout";

export default () => {
  return <CredentialProvider>
    <ThemeWrapper>
      <Routing/>
    </ThemeWrapper>
  </CredentialProvider>;
}
