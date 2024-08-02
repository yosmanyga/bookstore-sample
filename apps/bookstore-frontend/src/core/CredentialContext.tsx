import React, {createContext, FC, ReactNode, useContext} from 'react';
import Secure from 'secure-ls';
import {jwtDecode} from "jwt-decode";

import {CredentialType} from "../type";

const CredentialContext = createContext<{
  setToken: (token: string) => void;
  removeToken: () => void;
  getCredential: () => CredentialType | null;
}>({
  setToken: () => null,
  removeToken: () => null,
  getCredential: () => null
});

const CredentialProvider: FC<{ children: ReactNode }> = ({children}) => {
  const secure = new Secure();

  const setToken = (token: string) => {
    secure.set('token', token);
  };

  const removeToken = () => {
    secure.remove('token');
  }

  const getCredential = (): CredentialType | null => {
    const token = secure.get('token');

    if (!token) {
      return null;
    }

    return jwtDecode(token);
  };

  return <CredentialContext.Provider value={{setToken, removeToken, getCredential}}>
    {children}
  </CredentialContext.Provider>;
};

const useCredential = (): CredentialType | null => {
  const context = useContext(CredentialContext);

  if (!context) {
    throw new Error('useCredential must be used within a CredentialProvider');
  }

  return context.getCredential();
};

export {
  CredentialContext,
  CredentialProvider,
  useCredential
}
