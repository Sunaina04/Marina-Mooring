export const validateEmail = (email: string): string | null => {
  const isValidEmail = /[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  return isValidEmail ? null : 'Email is not valid';
};

export const validatePassword = (password: string): string | null => {
  const isValidPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  return isValidPassword ? null : 'Password is not valid';
};

export const validateName = (name: string): string | null => {
  const isValidName = /(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})/.test(
    name,
  );
  return isValidName ? null : 'Name is not valid';
};

export const PasswordValidation = (email: string, password: string, name: string): string | null => {
  const emailError = validateEmail(email);
  if (emailError) return emailError;

  const passwordError = validatePassword(password);
  if (passwordError) return passwordError;

  const nameError = validateName(name);
  if (nameError) return nameError;

  return null;
};
