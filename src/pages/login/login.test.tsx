import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './login';
import { withRouter, withStore } from '../../test-utils/mock-component';
import { createFakeStore } from '../../test-utils/mock/store';
import { UserAuth } from '../../types/user-auth';
import { useCityLinkClick } from '../../hooks/use-city-link-click/use-city-link-click';
import { Mock } from 'vitest';
import { useActionCreators } from '../../hooks';

vi.mock('../../components/layout/header/header', () => ({
  default: vi.fn(() => <div data-testid="header-mock" />),
}));

vi.mock('../../hooks/use-city-link-click/use-city-link-click', () => ({
  useCityLinkClick: vi.fn(),
}));

vi.mock('../../hooks', () => ({
  useActionCreators: vi.fn(),
}));

describe('Component: Login', () => {
  const loginElementTestId = 'loginElement';
  const passwordElementTestId = 'passwordElement';
  const expectedLoginValue = 'test-login@example.com';
  const expectedPasswordValue = 'test-password';
  const loginAction = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      loginAction
    });
  });

  it('должен рендериться корректно', () => {
    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('header-mock')).toBeInTheDocument();
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('должно отображаться корректно, когда пользователь вводит логин и пароль', async () => {
    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId(loginElementTestId),
      expectedLoginValue,
    );
    await userEvent.type(
      screen.getByTestId(passwordElementTestId),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedLoginValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('должен вызывать loginAction с правильными данными при отправке формы', async () => {
    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());

    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);

    await userEvent.type(screen.getByTestId(loginElementTestId), expectedLoginValue);
    await userEvent.type(screen.getByTestId(passwordElementTestId), expectedPasswordValue);
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));


    const expectedUserAuth: UserAuth = {
      email: expectedLoginValue,
      password: expectedPasswordValue,
    };

    expect(loginAction).toHaveBeenCalledTimes(1);
    expect(loginAction).toHaveBeenCalledWith(expectedUserAuth);
  });

  it('не должен вызывать loginAction при отправке пустой формы', async () => {
    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());

    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);

    await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

    expect(loginAction).not.toHaveBeenCalled();
  });

  it('поля email и password должны быть обязательными', () => {
    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);

    const emailInput = screen.getByTestId(loginElementTestId);
    const passwordInput = screen.getByTestId(passwordElementTestId);

    expect(emailInput).toHaveAttribute('required');
    expect(passwordInput).toHaveAttribute('required');
  });

  it('должен вызывать handleCityLinkClick при клике по ссылке с городом', async () => {
    const mockHandleCityLinkClick = vi.fn();
    (useCityLinkClick as Mock).mockReturnValue(mockHandleCityLinkClick);

    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;
    render(withStoreComponent);
    const cityLink = screen.getByTestId('cityLink');
    expect(cityLink).toBeInTheDocument();
    await userEvent.click(cityLink);

    expect(mockHandleCityLinkClick).toHaveBeenCalledTimes(1);
  });

  it('должен вызывать evt.preventDefault при отправке формы', async () => {
    const componentWithRouter = withRouter(<Login />);
    const componentWithStore = withStore(componentWithRouter, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    const form = screen.getByTestId('login').querySelector('form');
    await userEvent.type(screen.getByTestId(loginElementTestId), expectedLoginValue);
    await userEvent.type(screen.getByTestId(passwordElementTestId), expectedPasswordValue);
    const mockEvent = new Event('submit', { bubbles: true, cancelable: true });
    const preventDefaultSpy = vi.spyOn(mockEvent, 'preventDefault');
    if (form) {
      form.dispatchEvent(mockEvent);
    }

    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
  });
});
