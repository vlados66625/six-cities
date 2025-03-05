import { createAPI } from '../../../../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { Action } from 'redux';
import { AppThunkDispatch } from '../../../../test-utils/types';
import { State } from '../../../../types/state';
import { extractActionsTypes } from '../../../../test-utils/util';
import { fetchAuthorizationStatusAction, loginAction, logoutAction } from '../authorization';
import { APIRoute, AuthorizationStatus } from '../../../../const';
import * as tokenStorage from '../../../../services/user-data';
import { UserAuth } from '../../../../types/user-auth';
import { createFakeResponseAuth } from '../../../../test-utils/mock';
import { ResponseAuth } from '../../../../types/response-auth';

describe('Async actions', () => {
  const api = createAPI();
  const mockApiAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({
      authorization: {
        authorizationStatus: AuthorizationStatus.Unknown,
        userName: '',
        avatarUrl: '',
      }
    });
  });

  describe('fetchAuthorizationStatusAction', () => {
    it('должен вызвать dispatch "fetchAuthorizationStatusAction.pending" и "fetchAuthorizationStatusAction.fulfilled" при ответе сервера со статусом 200', async () => {
      mockApiAdapter.onGet(APIRoute.Login).reply(200);

      await store.dispatch(fetchAuthorizationStatusAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAuthorizationStatusAction.pending.type,
        fetchAuthorizationStatusAction.fulfilled.type,
      ]);
    });

    it('должен вызвать dispatch с "fetchAuthorizationStatusAction.pending" и "fetchAuthorizationStatusAction.rejected" при ответе сервера со статусом 400', async () => {
      mockApiAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(fetchAuthorizationStatusAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchAuthorizationStatusAction.pending.type,
        fetchAuthorizationStatusAction.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    let fakeServerResponse: ResponseAuth;
    let fakeUser: UserAuth;

    beforeEach(() => {
      fakeServerResponse = createFakeResponseAuth();
      fakeUser = { email: fakeServerResponse.email, password: '24wdj2FseFeE' };
    });

    it('должен вызвать dispatch "loginAction.pending", "loginAction.fulfilled" при ответе сервера со статусом 200', async () => {
      mockApiAdapter.onPost(APIRoute.Login).reply(200, fakeServerResponse);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.fulfilled.type,
      ]);
    });

    it('должен вызвать dispatch "loginAction.pending", "loginAction.rejected" при ответе сервера со статусом 400', async () => {
      mockApiAdapter.onPost(APIRoute.Login).reply(400, fakeServerResponse);

      await store.dispatch(loginAction(fakeUser));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loginAction.pending.type,
        loginAction.rejected.type,
      ]);
    });

    it('долден вызвать "setUserData" один раз с "token, name, avatarUrl" при ответе сервера со статусом 200', async () => {
      mockApiAdapter.onPost(APIRoute.Login).reply(200, fakeServerResponse);

      const mockSetUserData = vi.spyOn(tokenStorage, 'setUserData');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSetUserData).toHaveBeenCalledTimes(1);
      expect(mockSetUserData).toHaveBeenCalledWith(fakeServerResponse.token, fakeServerResponse.name, fakeServerResponse.avatarUrl);
    });
  });

  describe('logoutAction', () => {
    it('должен вызвать dispatch "logoutAction.pending", "logoutAction.fulfilled" при ответе сервера со статусом 204', async () => {
      mockApiAdapter.onDelete(APIRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('долден вызвать "setUserData" один раз с "token, name, avatarUrl" при ответе сервера со статусом 200', async () => {
      mockApiAdapter.onDelete(APIRoute.Logout).reply(204);

      const mockDeleteUserData = vi.spyOn(tokenStorage, 'deleteUserData');

      await store.dispatch(logoutAction());

      expect(mockDeleteUserData).toHaveBeenCalledTimes(1);
      expect(mockDeleteUserData).toHaveBeenCalledWith();
    });
  });

});
