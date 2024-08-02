import {FC, ReactNode} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'

const defaultTheme = createTheme({palette: {mode: 'light'}});

const queryClient = new QueryClient()

const ThemeWrapper: FC<{ children: ReactNode }> = ({children}) => {
  return <ThemeProvider theme={defaultTheme}>
    <CssBaseline/>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </ThemeProvider>;
}

export {
  ThemeWrapper
}
