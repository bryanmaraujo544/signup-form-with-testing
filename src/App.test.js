import { getByText, render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import App from './App';

// function that will be called every time before a test block
beforeEach(() => {
  // eslint-disable-next-line testing-library/no-render-in-setup
  render(<App />);
});

function typeIntoForm({ email, password, confirmPassword }) {
  const emailInput = screen.getByRole('textbox', {
    name: /email/i,
  });
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvents.type(emailInput, email);
  }
  if (password) {
    userEvents.type(passwordInput, password);
  }
  if (confirmPassword) {
    userEvents.type(confirmPasswordInput, confirmPassword);
  }

  return { emailInput, passwordInput, confirmPasswordInput };
}

test('inputs should be initially empty', () => {
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');

  // prettier-ignore
  const confirmPasswordInputElement = screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  const { emailInput } = typeIntoForm({ email: 'bryan' });

  expect(emailInput.value).toBe('bryan');
});

test('should be able to type a password', () => {
  const { passwordInput } = typeIntoForm({ password: 'menino01' });
  expect(passwordInput.value).toBe('menino01');
});

test('should be able to type a confirm password', () => {
  const { confirmPasswordInput } = typeIntoForm({
    confirmPassword: 'menino01',
  });
  expect(confirmPasswordInput.value).toBe('menino01');
});

test('should show email error message on invalid email', () => {
  const emailErrorMessage = screen.queryByText(
    /the email you input is invalid/i
  );
  const submitBtn = screen.getByRole('button');

  expect(emailErrorMessage).not.toBeInTheDocument();

  typeIntoForm({ email: 'bryangmail.com' });
  userEvents.click(submitBtn);

  const emailErrorMessageAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorMessageAgain).toBeInTheDocument();
});

test('should show password error if password is less than 5 charactes', () => {
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contains 5 or more characters/i
  );
  const submitBtn = screen.getByRole('button');

  typeIntoForm({ email: 'selena@gmail.com' });
  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ password: '123' });
  userEvents.click(submitBtn);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contains 5 or more characters/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test('should show confirm password error if password dont match', () => {
  const submitBtn = screen.getByRole('button');
  const confirmPasswordErrorElement = screen.queryByText(
    /the passwords do not match. try again/i
  );

  typeIntoForm({ email: 'selena@gmail.com', password: '12345' });
  userEvents.click(submitBtn);

  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ confirmPassword: '123445' });
  userEvents.click(submitBtn);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the passwords do not match. try again/i
  );
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

test('should show no one errors if the is all correct', () => {
  const submitBtn = screen.getByRole('button');

  typeIntoForm({
    email: 'bryan@gmail.com',
    password: '12345',
    confirmPassword: '12345',
  });
  userEvents.click(submitBtn);

  const emailError = screen.queryByText(/the email you input is invalid/i);
  const passwordError = screen.queryByText(
    /the password you entered should contains 5 or more characters/i
  );
  const confirmPasswordError = screen.queryByText(
    /the passwords do not match. try again/i
  );

  expect(emailError).not.toBeInTheDocument();
  expect(passwordError).not.toBeInTheDocument();
  expect(confirmPasswordError).not.toBeInTheDocument();
});
