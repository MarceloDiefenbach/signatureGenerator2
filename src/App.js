import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './Dashboard/Dashboard';
import CreateAccount from './CreateAccount/CreateAccount';
import SettingsView from './Settings/Settings';
import FolderView from './Folder/Folder';
import './App.css';
import Settings from './Settings/Settings';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element={<Login />} />
          <Route path = "/dashboard" element={<Dashboard />} />
          <Route path = "/createAccount" element={<CreateAccount />} />
          <Route path="/folder/:folderid" element={<FolderView />} />
          <Route path = "/settings" element={<SettingsView />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;