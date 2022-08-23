import './App.css';
import Navbar from './Components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import { createContext, useState } from 'react';
import CoinPage from './pages/CoinPage';
export const AppContext = createContext();

function App() {
  const [currency, setCurrency] = useState("INR")
  const theme = createTheme({
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Poppins',
        'sans-serif'

      ].join(','),

    }
  });
  return (
    <AppContext.Provider value={{currency, setCurrency}}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/coins/:id' element={<CoinPage/>} />
          </Routes>
        </Router>

      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
