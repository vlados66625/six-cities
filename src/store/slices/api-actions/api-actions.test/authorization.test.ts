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
// import * as tokenStorage from '../../../../services/user-data';

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

});
