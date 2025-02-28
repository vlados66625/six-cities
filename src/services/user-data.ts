enum KeyName {
  AUTH_TOKEN_KEY_NAME = 'six-cities-auth-token',
  USER_NAME_KEY_NAME = 'six-cities-user-name',
  AVATAR_URL_KEY_NAME = 'six-cities-avatar-url',
}

export function setUserData(token: string, name: string, avatarUrl: string) {
  localStorage.setItem(KeyName.AUTH_TOKEN_KEY_NAME, token);
  localStorage.setItem(KeyName.USER_NAME_KEY_NAME, name);
  localStorage.setItem(KeyName.AVATAR_URL_KEY_NAME, avatarUrl);
}

export function deleteUserData() {
  localStorage.removeItem(KeyName.AUTH_TOKEN_KEY_NAME);
  localStorage.removeItem(KeyName.USER_NAME_KEY_NAME);
  localStorage.removeItem(KeyName.AVATAR_URL_KEY_NAME);
}

export function getToken(): string {
  return localStorage.getItem(KeyName.AUTH_TOKEN_KEY_NAME) ?? '';
}

export function getUserName(): string {
  return localStorage.getItem(KeyName.USER_NAME_KEY_NAME) ?? '';
}

export function getAvatarUrl(): string {
  return localStorage.getItem(KeyName.AVATAR_URL_KEY_NAME) ?? '';
}
