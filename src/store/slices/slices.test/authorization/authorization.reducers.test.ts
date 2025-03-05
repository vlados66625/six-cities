import { authorizationSlice } from '../../authorization';
import { AuthorizationStatus } from '../../../../const';
import { authorizationActions } from '../../authorization';
import { State } from '../../../../types/state';
import { createFakeResponseAuth } from '../../../../test-utils/mock';

describe('authorization reducers', () => {
  let initialState: State['authorization'];
  const fakeResponseAuth = createFakeResponseAuth();

  beforeEach(() => {
    initialState = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userName: '',
      avatarUrl: '',
    };
  });

  it('должен вернуть initial state с пустым action', () => {
    const emptyAction = { type: '' };

    const result = authorizationSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть initial state с "undefiend" state и пустым action', () => {
    const emptyAction = { type: '' };

    const result = authorizationSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть state с "AuthorizationStatus.Auth" при action "fetchAuthorizationStatusAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
    };

    const result = authorizationSlice.reducer(initialState, authorizationActions.fetchAuthorizationStatusAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с "AuthorizationStatus.NoAuth" при action "fetchAuthorizationStatusAction.rejected"', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.NoAuth,
    };

    const result = authorizationSlice.reducer(initialState, authorizationActions.fetchAuthorizationStatusAction.rejected(null, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с "AuthorizationStatus.Auth", переданными "name" и "avatarUrl" при action "loginAction.fulfilled"', () => {
    const expectedState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
      userName: fakeResponseAuth.name,
      avatarUrl: fakeResponseAuth.avatarUrl,
    };

    const result = authorizationSlice.reducer(initialState, authorizationActions.loginAction.fulfilled(fakeResponseAuth, '', { email: fakeResponseAuth.email, password: '2f32f32FsdfFS' }));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с "AuthorizationStatus.NoAuth", пустыми "name" и "avatarUrl" при action "logoutAction.fulfilled"', () => {
    const prevState = {
      ...initialState,
      authorizationStatus: AuthorizationStatus.Auth,
      userName: fakeResponseAuth.name,
      avatarUrl: fakeResponseAuth.avatarUrl,
    };

    const expectedState = {
      ...prevState,
      authorizationStatus: AuthorizationStatus.NoAuth,
      userName: '',
      avatarUrl: '',
    };

    const result = authorizationSlice.reducer(prevState, authorizationActions.logoutAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
