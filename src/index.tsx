import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/GoogleAuthContext';
import ThemeProvider from './components/layout/ThemeToggle/theme-provider';
import { NoteContextProvider } from './context/NotesContext';
// import { ThemeProvider } from './context/LayoutContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <NoteContextProvider>
          <ThemeProvider defaultTheme="light">
            <App />
          </ThemeProvider>
        </NoteContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
);

reportWebVitals();
