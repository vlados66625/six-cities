import { useAppSelector } from './';
import { offersSelectors } from '../store/slices/offers';
import { AuthorizationStatus } from '../const';

export function useIsAuth() {
  const authorizationStatus = useAppSelector(offersSelectors.authorizationStatus);
  return authorizationStatus === AuthorizationStatus.Auth;
}
