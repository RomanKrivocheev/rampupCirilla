import React from 'react';
import './App.css';
import { LoginForm } from './Login';

/**
 * The main application component.
 * Renders the login form.
 */
const App = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export { App };
