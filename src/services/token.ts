import { AUTH_TOKEN_KEY_NAME } from '../const';

export type Token = string;

export function setToken(token: Token) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
}

export function deleteToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
}

export function getToken(): Token {
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
}

