import React, { useState } from 'react';
import './App.css';
import RegisterForm from './Register';
import Lists from './Lists';

/**
 * The login form component.
 * Manages user login and registration.
 * @returns {JSX.Element} The rendered JSX element.
 */
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [registered, setRegistered] = useState(false);

  /**
   * Handles the login form submission.
   * @param {Event} e - The form submit event.
   */
  const handleLogin = (e) => {
    e.preventDefault();

    const user = registeredUsers.find(
      (user) =>
        user.username.toLowerCase() === username.toLowerCase() &&
        user.password === password
    );

    if (user) {
      setMessage('Login successful!');
      setLoggedIn(true);
    } else {
      setMessage('Incorrect username or password');
    }
  };

  /**
   * Handles the creation of a new account.
   */
  const handleCreateAccount = () => {
    setShowRegister(true);
  };

  /**
   * Handles the registration form submission.
   * @param {Object} userInfo - The user registration information.
   */
  const handleRegister = (userInfo) => {
    const newUser = { username: userInfo.username, password: userInfo.password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setShowRegister(false);
    setMessage('Account created successfully!');
    setRegistered(true);
  };

  /**
   * Handles the back button click in the registration form.
   */
  const handleBack = () => {
    setShowRegister(false);
    setMessage('');
  };

  return (
    <div className='container'>
      {showRegister ? (
        <div>
          <h1 className='register-title'>Create a new account</h1>
          <RegisterForm onRegister={handleRegister} onBack={handleBack} />
        </div>
      ) : (
        <div>
          {!loggedIn ? (
            <div>
              <h1 className='login-title'>Log In</h1>
              <form className='form' onSubmit={handleLogin}>
                <div>
                  <label>Username:</label>
                  <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label>Password:</label>
                  <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='buttons'>
                  <button type='submit'>Send</button>
                </div>
              </form>
              {!loggedIn && (
                <div>
                  <button
                    onClick={handleCreateAccount}
                    className='create-account-button'
                  >
                    Create a new account
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='welcome-message'>¡Hola, {username}!</div>
          )}
        </div>
      )}
      {registered && !loggedIn && <div>{message}</div>}
      {loggedIn && <Lists username={username} />}
    </div>
  );
};

export {LoginForm };
