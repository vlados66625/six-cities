import { act, render, screen } from '@testing-library/react';
import ReviewsForm from '../reviews-form';
import { withStore } from '../../../../../test-utils/mock-component';
import { createFakeStore } from '../../../../../test-utils/mock/store';
import { useActionCreators } from '../../../../../hooks';
import { Mock } from 'vitest';
import userEvent from '@testing-library/user-event';

vi.mock('../../../../../hooks', () => ({
  useActionCreators: vi.fn(),
}));

describe('Component: ReviewsForm', () => {
  const reviewPostAction = vi.fn();
  const offerId = 'test-id';


  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      reviewPostAction
    });
  });

  it('должен рендериться корректно', () => {
    const componentWithStore = withStore(<ReviewsForm offerId={offerId} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    expect(screen.getByTestId('reviews-form')).toBeInTheDocument();
    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  it('должно отображаться корректно, когда пользователь вводит текст выбирает рейтинг', async () => {
    const expectedReviewText = 'test-review-text';

    const componentWithStore = withStore(<ReviewsForm offerId={offerId} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    const textArea = screen.getByTestId('reviews-textarea');
    await act(async () => {
      await userEvent.type(textArea, expectedReviewText);
    });

    expect(screen.getByDisplayValue(expectedReviewText)).toBeInTheDocument();
  });

  it('должно отображаться корректно, когда пользователь выбирает рейтинг', async () => {
    const componentWithStore = withStore(<ReviewsForm offerId={offerId} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);

    const ratingLabel = screen.getByTestId('label-perfect');
    const ratingInput = screen.getByTestId('radio-perfect');

    await act(async () => {
      await userEvent.click(ratingLabel);
    });

    expect(ratingInput).toBeChecked();
  });

  it('кнопка отправотзыва ведет себя корректно при вводе текста и должен вызваться reviewPostAction при отправке формы длиной  50 > и < 300 символов и с выбранным рейтингом', async () => {
    const componentWithStore = withStore(<ReviewsForm offerId={offerId} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const buttonSubmit = screen.getByTestId('button-submit');

    const textArea = screen.getByTestId('reviews-textarea');
    await act(async () => {
      await userEvent.type(textArea, 'Тестовый текст длиной более 50 символов для проверки');
    });
    const ratingLabel = screen.getByTestId('label-perfect');
    await act(async () => {
      await userEvent.click(ratingLabel);
    });
    expect(buttonSubmit).not.toBeDisabled();
    await act(async () => {
      await userEvent.click(buttonSubmit);
    });

    expect(reviewPostAction).toHaveBeenCalledTimes(1);
    expect(buttonSubmit).toBeDisabled();
  });

  it('кнопка отправки отзыва не активна, если текст меньше 50 символов', async () => {
    const componentWithStore = withStore(<ReviewsForm offerId={offerId} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const buttonSubmit = screen.getByTestId('button-submit');

    const textArea = screen.getByTestId('reviews-textarea');
    await act(async () => {
      await userEvent.type(textArea, 'текст длиной менее 50 символов');
    });

    expect(buttonSubmit).toBeDisabled();
  });

  it('кнопка отправки отзыва не активна, если текст больше 300 символов', async () => {
    const componentWithStore = withStore(<ReviewsForm offerId={offerId} />, createFakeStore());
    const { withStoreComponent } = componentWithStore;

    render(withStoreComponent);
    const buttonSubmit = screen.getByTestId('button-submit');

    const textArea = screen.getByTestId('reviews-textarea');
    await act(async () => {
      await userEvent.type(textArea, 'Текст длиной более 300 символов Тестовый текст длиной более 300 символов для проверкиТестовый текст длиной более 300 символов для проверкиТестовый текст длиной более 300 символов для проверкиТестовый текст длиной более 300 символов для проверкиТестовый текст длиной более 300 символов для проверкиТестовый текст длиной более 300');
    });

    expect(buttonSubmit).toBeDisabled();
  });
});
