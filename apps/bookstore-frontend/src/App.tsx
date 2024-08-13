import {CredentialProvider} from "./core";
import {Routing, ThemeWrapper} from "./layout";

export default () => {
  return <CredentialProvider>
    <ThemeWrapper>
      <Routing/>
    </ThemeWrapper>
  </CredentialProvider>;
}
