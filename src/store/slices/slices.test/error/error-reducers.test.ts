import { faker } from '@faker-js/faker';
import { errorSlice } from '../../error';
import { errorActions } from '../../error';

describe('error reducers', () => {
  const fakeError = faker.lorem.sentence({ min: 3, max: 6 });

  const initialState = {
    error: null,
  };

  it('должен вернуть initial state с пустым action', () => {
    const emptyAction = { type: '' };

    const result = errorSlice.reducer(initialState, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть initial state с "undefiend" state и пустым action', () => {
    const emptyAction = { type: '' };

    const result = errorSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('должен вернуть state с установленным "error" при action "setError"', () => {
    const expectedState = {
      error: fakeError,
    };

    const result = errorSlice.reducer(initialState, errorActions.setError(fakeError));

    expect(result).toEqual(expectedState);
  });

  it('должен вернуть state с "error = null" при action "deleteErrorAction.fulfilled"', () => {
    const prevState = {
      error: fakeError,
    };

    const expectedState = {
      error: null,
    };

    const result = errorSlice.reducer(prevState, errorActions.deleteErrorAction.fulfilled(undefined, '', undefined));

    expect(result).toEqual(expectedState);
  });
});
