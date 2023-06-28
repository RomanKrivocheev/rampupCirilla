import React, { useState } from 'react';

function RegisterForm({ onRegister, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const isPasswordValid = password.length >= 7 && password === confirmPassword;
  const [registered, setRegistered] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    if (!isPasswordValid) {
      setErrorMessage(
        'Password should have at least 7 characters and match the confirmation'
      );
    } else {
      onRegister({ username, password });
      setErrorMessage('');
      setRegistered(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');

    if (confirmPassword !== '' && e.target.value !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage('');

    if (e.target.value !== password) {
      setErrorMessage('Passwords do not match');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister(e);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  return (
    <div>
      {registered ? (
        <div className='welcome-message'>¡Hola, {username}!</div>
      ) : (
        <form className='form' onSubmit={handleRegister}>
          <div>
            <label>Username:</label>
            <input
              type='text'
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div>
            <label>Confirm Password:</label>
            <input
              type='password'
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              onKeyPress={handleKeyPress}
              disabled={password.length < 7}
            />
          </div>
          <div className='buttons'>
            {onBack && (
              <button type='button' onClick={handleBack} className='back-button'>
                Back
              </button>
            )}
            <button type='submit' className='create-button' disabled={!isPasswordValid}>
              Create
            </button>
          </div>
          {errorMessage && <div className='error-message'>{errorMessage}</div>}
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
