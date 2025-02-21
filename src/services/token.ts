import { AUTH_TOKEN_KEY_NAME } from '../const';

export function setToken(token: string) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

export function deleteToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}

export function getToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
}

