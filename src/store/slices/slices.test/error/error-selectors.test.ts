import { errorSlice } from '../../error';
import { errorSelectors } from '../../error';

describe('authorization selectors', () => {
  it('should return error from state ', () => {
    const state = {
      [errorSlice.name]: {
        error: 'text error',
      }
    };
    const { error } = state[errorSlice.name];
    const result = errorSelectors.error(state);
    expect(result).toBe(error);
  });
});
