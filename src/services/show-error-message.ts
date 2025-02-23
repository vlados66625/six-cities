import { store } from '../store';
import { deleteErrorAction } from '../store/api-actions';
import { errorActions } from '../store/slices/error';

export function showErrorMessage(errorMessage: string) {
  store.dispatch(errorActions.setError(errorMessage));
  store.dispatch(deleteErrorAction());
}
