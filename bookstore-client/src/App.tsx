import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SideNavigation from './components/SideNavigation';
import BookList from './components/BookList';
import Cart from './components/Cart';
import { SnackbarProvider } from './components/SnackbarContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <SnackbarProvider>
        <Router>
          <SideNavigation />
          <Routes>
            <Route path="/" element={<Navigate to="/available-books" replace />} />
            <Route path="/available-books" element={<BookList />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </SnackbarProvider>
    </div>
  );
};

export default App;
