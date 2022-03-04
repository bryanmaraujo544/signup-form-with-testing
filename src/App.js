import { useState } from 'react';
import validator from 'validator';
import './App.css';

function App() {
  const [signupInput, setSignupInput] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');

  function handleChange(event, inputName) {
    setSignupInput({
      ...signupInput,
      [inputName]: event.target.value,
    });
  }

  function handleClick(e) {
    e.preventDefault();

    if (!validator.isEmail(signupInput.email)) {
      return setError('the email you input is invalid');
    } else if (signupInput.password.length < 5) {
      return setError(
        'The password you entered should contains 5 or more characters'
      );
    } else if (signupInput.password !== signupInput.confirmPassword) {
      return setError('The passwords do not match. try again');
    }
  }

  return (
    <div className="container">
      <form>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={signupInput.email}
            onChange={(e) => handleChange(e, 'email')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={signupInput.password}
            onChange={(e) => handleChange(e, 'password')}
          />
        </div>
        <div className="input-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            value={signupInput.confirmPassword}
            onChange={(e) => handleChange(e, 'confirmPassword')}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" onClick={handleClick}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;
