import { AUTH_TOKEN_KEY_NAME, EMAIL_TOKEN_KEY_NAME } from '../const';

export function setUserData(token: string, email: string) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  localStorage.setItem(EMAIL_TOKEN_KEY_NAME, email);
}

export function deleteUserData() {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(EMAIL_TOKEN_KEY_NAME);
}

export function getToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
}

export function getEmail(): string {
  return localStorage.getItem(EMAIL_TOKEN_KEY_NAME) ?? '';
}
