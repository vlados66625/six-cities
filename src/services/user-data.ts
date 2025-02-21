import { AUTH_TOKEN_KEY_NAME, EMAIL_TOKEN_KEY_NAME } from '../const';

export type Token = string;

export function setUserData(token: Token, email: string) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  localStorage.setItem(EMAIL_TOKEN_KEY_NAME, email);
}

export function deleteUserData() {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(EMAIL_TOKEN_KEY_NAME);
}

export function getToken(): Token {
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
}

export function getEmail(): string {
  return localStorage.getItem(EMAIL_TOKEN_KEY_NAME) ?? '';
}
