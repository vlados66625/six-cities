import { AuthorizationStatus } from '../../../../const';
import { authorizationSlice } from '../../authorization';
import { authorizationSelectors } from '../../authorization';

describe('authorization selectors', () => {
  it('should return authorizationStatus from state', () => {
    const state = {
      [authorizationSlice.name]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'user',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/7.jpg',
      }
    };
    const { authorizationStatus } = state[authorizationSlice.name];
    const result = authorizationSelectors.authorizationStatus(state);
    expect(result).toBe(authorizationStatus);
  });

  it('should return userName from state', () => {
    const state = {
      [authorizationSlice.name]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'user',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/7.jpg',
      }
    };
    const { userName } = state[authorizationSlice.name];
    const result = authorizationSelectors.userName(state);
    expect(result).toBe(userName);
  });

  it('should return avatarUrl from state', () => {
    const state = {
      [authorizationSlice.name]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'user',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/7.jpg',
      }
    };
    const { avatarUrl } = state[authorizationSlice.name];
    const result = authorizationSelectors.avatarUrl(state);
    expect(result).toBe(avatarUrl);
  });

  it('should return "true" because auth status is "Auth"', () => {
    const state = {
      [authorizationSlice.name]: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: 'user',
        avatarUrl: 'https://15.design.htmlacademy.pro/static/avatar/7.jpg',
      }
    };
    const result = authorizationSelectors.isAuth(state);
    expect(result).toBe(true);
  });

  it('should return "false" because auth status is "NoAuth"', () => {
    const state = {
      [authorizationSlice.name]: {
        authorizationStatus: AuthorizationStatus.NoAuth,
        userName: '',
        avatarUrl: '',
      }
    };
    const result = authorizationSelectors.isAuth(state);
    expect(result).toBe(false);
  });

  it('should return "false" because auth status is "Unknown"', () => {
    const state = {
      [authorizationSlice.name]: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userName: '',
        avatarUrl: '',
      }
    };
    const result = authorizationSelectors.isAuth(state);
    expect(result).toBe(false);
  });
});
