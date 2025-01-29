import getAuthorizationStatus from './mock/get-authorization-status';
import { AuthorizationStatus } from './const';

export function getIsAuth() {
  return getAuthorizationStatus() === AuthorizationStatus.Auth;
}
