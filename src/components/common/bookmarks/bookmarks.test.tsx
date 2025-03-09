import { render, screen } from '@testing-library/react';
import Bookmarks from './bookmarks';
import { withStore } from '../../../test-utils/mock-component';
import { createFakeStore } from '../../../test-utils/mock/store';
import { useActionCreators } from '../../../hooks';
import { useNavigate } from 'react-router-dom';
import { Mock } from 'vitest';
import { AppRoute, AuthorizationStatus } from '../../../const';
import userEvent from '@testing-library/user-event';

vi.mock('../../../hooks', async () => {
  const original = await vi.importActual('../../../hooks');
  return {
    ...original,
    useActionCreators: vi.fn(),
  };
});

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

describe('Component: Bookmarks', () => {
  const setFavoriteOfferAction = vi.fn();
  const navigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      setFavoriteOfferAction,
    });
    (useNavigate as Mock).mockReturnValue(navigate);
  });

  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<Bookmarks width={18} height={19} offerId='12345' blockName='place-card' />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('должен перенаправить пользователя на страницу AppRoute.Login, если пользователь не авторизован', async () => {
    const componentWithStore = withStore(<Bookmarks width={18} height={19} offerId='12345' blockName='place-card' />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(navigate).toHaveBeenCalledWith(AppRoute.Login);
    expect(setFavoriteOfferAction).not.toHaveBeenCalled();
  });

  it('должен вызвать setFavoriteOfferAction, если пользователь авторизован', async () => {
    const fakeStore = createFakeStore({
      authorization: {
        authorizationStatus: AuthorizationStatus.Auth,
        userName: '',
        avatarUrl: '',
      }
    });
    const offerId = '12345';
    const componentWithStore = withStore(<Bookmarks width={18} height={19} offerId={offerId} blockName='place-card' />, fakeStore);
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(setFavoriteOfferAction).toHaveBeenCalledTimes(1);
    expect(navigate).not.toHaveBeenCalled();
  });
});
