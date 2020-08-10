const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const smallLetters = "abcdefghijklmnopqrstuvwxyz";
const digits = "0123456789";
const specialChars = "!@#$&*";

const validChars = capitalLetters + smallLetters + digits + specialChars;
const alphabet = capitalLetters + smallLetters;

export const composeValidators = (...validators) => (name, value) =>
  validators.reduce(
    (error, validator) => error || validator(name, value),
    undefined
  );

export const required = (_name, value) => (value ? undefined : "required");

export const isEmail = (_name, value) =>
  /\S+@\S+\.\S+/.test(value) ? undefined : "Invalid email format";

export const mustContainCapital = (_name, value) =>
  value && value.split("").some((c) => capitalLetters.includes(c))
    ? undefined
    : "must contain a capital letter";

export const mustContainSmall = (_name, value) =>
  value && value.split("").some((c) => smallLetters.includes(c))
    ? undefined
    : "must contain a small letter";

export const mustContainDigit = (_name, value) =>
  value && value.split("").some((c) => digits.includes(c))
    ? undefined
    : "must contain a number";

export const mustContainSpecial = (_name, value) =>
  value && value.split("").some((c) => specialChars.includes(c))
    ? undefined
    : "must contain a special character";

export const hasValidChars = (_name, value) =>
  value && value.split("").every((c) => validChars.includes(c))
    ? undefined
    : `Only ${specialChars} special characters are allowed`;

export const hasOnlyAlphabet = (_name, value) =>
  value && value.split("").every((c) => alphabet.includes(c))
    ? undefined
    : `Only small and capital letters are allowed`;

export const hasMinLength = (length) => (_name, value) =>
  value && value.length >= length
    ? undefined
    : `must be atleast ${length} characters`;

export const hasMaxLength = (length) => (_name, value) =>
  value && value.length <= length
    ? undefined
    : `must be less than ${length} characters`;
