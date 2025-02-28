import { AUTH_TOKEN_KEY_NAME, USER_NAME_TOKEN_KEY_NAME, AVATAR_URL_TOKEN_KEY_NAME } from '../const';

export function setUserData(token: string, name: string, avatarUrl: string) {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
  localStorage.setItem(USER_NAME_TOKEN_KEY_NAME, name);
  localStorage.setItem(AVATAR_URL_TOKEN_KEY_NAME, avatarUrl);
}

export function deleteUserData() {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(USER_NAME_TOKEN_KEY_NAME);
  localStorage.removeItem(AVATAR_URL_TOKEN_KEY_NAME);
}

export function getToken(): string {
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
}

export function getUserName(): string {
  return localStorage.getItem(USER_NAME_TOKEN_KEY_NAME) ?? '';
}

export function getAvatarUrl(): string {
  return localStorage.getItem(AVATAR_URL_TOKEN_KEY_NAME) ?? '';
}
