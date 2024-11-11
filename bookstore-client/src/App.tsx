import './App.css';
// src/App.tsx
import React from 'react';
import BookList from './components/BookList';
import PermanentDrawerLeft from './components/SideNavigation';
import { SnackbarProvider } from './components/SnackbarContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <SnackbarProvider>
        <PermanentDrawerLeft />
        <BookList />
      </SnackbarProvider>
    </div>
  );
};

export default App;

