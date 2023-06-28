import React, { useState } from 'react';
import './App.css';
import RegisterForm from './Register';
import Lists from './Lists';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([
    { username: 'Fernando Boretto', password: 'fernandoboretto' },
  ]);
  const [loggedIn, setLoggedIn] = useState(false); // Nuevo estado para controlar el inicio de sesión exitoso
  const [registered, setRegistered] = useState(false); // Nuevo estado para controlar el registro exitoso

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

  const handleCreateAccount = () => {
    setShowRegister(true);
  };

  const handleRegister = (userInfo) => {
    const newUser = { username: userInfo.username, password: userInfo.password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setShowRegister(false);
    setMessage('Account created successfully!');
    setRegistered(true);
  };

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
          {!loggedIn && <h1 className='login-title'>Log In</h1>}
          {loggedIn ? (
            <div className='welcome-message'>¡Hola, {username}!</div>
          ) : (
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
          )}
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
      )}
      {registered && !loggedIn && <div>{message}</div>}
      {loggedIn && <Lists username={username} />}
    </div>
  );
}

export default LoginForm;
