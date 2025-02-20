import { store } from '../store';
import { deleteErrorAction } from '../store/api-actions';
import { offersActions } from '../store/slices/offers';

export function showErrorMessage(errorMessage: string) {
  store.dispatch(offersActions.setError(errorMessage));
  store.dispatch(deleteErrorAction());
}
