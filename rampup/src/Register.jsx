import React, { useState } from 'react';

/**
 * The registration form component.
 * Manages user registration.
 * @param {Object} props - The component props.
 * @param {Function} props.onRegister - The function to handle registration.
 * @param {Function} props.onBack - The function to handle going back.
 * @returns {JSX.Element} The rendered JSX element.
 */
function RegisterForm({ onRegister, onBack }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [registered, setRegistered] = useState(false);

  /**
   * Validates a password.
   * @param {string} password - The password to validate.
   * @returns {boolean} Whether the password is valid or not.
   */
  const isPasswordValid = (password) => {
    return password.length >= 7 && password === confirmPassword;
  };

  /**
   * Handles the registration form submission.
   * @param {Event} e - The form submit event.
   */
  const handleRegister = (e) => {
    e.preventDefault();

    if (!isPasswordValid(password)) {
      setErrorMessage(
        'Password should have at least 7 characters and match the confirmation'
      );
    } else {
      onRegister({ username, password });
      setErrorMessage('');
      setRegistered(true);
    }
  };

  /**
   * Handles the username input change event.
   * @param {Event} e - The input change event.
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * Handles the password input change event.
   * @param {Event} e - The input change event.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage('');

    if (confirmPassword !== '' && e.target.value !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    }
  };

  /**
   * Handles the confirm password input change event.
   * @param {Event} e - The input change event.
   */
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage('');

    if (e.target.value !== password) {
      setErrorMessage('Passwords do not match');
    }
  };

  /**
   * Handles the key press event.
   * @param {Event} e - The key press event.
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister(e);
    }
  };

  /**
   * Handles the back button click event.
   */
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
            <label>ConfirmPassword:</label>
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
            <button type='submit' className='create-button' disabled={!isPasswordValid(password)}>
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
