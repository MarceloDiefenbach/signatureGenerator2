import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [folderName, setFolderName] = useState('');

  const updateFolderName = (newFolderName) => {
    setFolderName(newFolderName);
  };

  return (
    <GlobalContext.Provider value={{ folderName, updateFolderName }}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
