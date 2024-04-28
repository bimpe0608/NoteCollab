import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup';
import ProtectedComponent from './components/Protected';
import AppLayout from './components/app-layout';
import SettingsAccountPage from './pages/settings/account';
import NotFound from './components/not-found';
import SettingsAppearancePage from './pages/settings/appearance';
import NotePage from './pages/notes';
import ImageUploadPage from './pages/upload';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp />} />

      <Route path="/dashboard" element={<ProtectedComponent />}>
        <Route path="" element={<NotePage />} />
        <Route path="upload" element={<ImageUploadPage />} />
      </Route>
      <Route path="/settings" element={<ProtectedComponent />}>
        <Route path="account" element={<SettingsAccountPage />} />
        <Route path="appearance" element={<SettingsAppearancePage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
