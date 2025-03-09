import { renderHook } from '@testing-library/react';
import { useHoverCard } from './use-hover-card';
import { useActionCreators } from '..';
import { Mock } from 'vitest';

vi.mock('..', () => ({
  useActionCreators: vi.fn(),
}));

describe('useHoverCard', () => {
  const mockSetidFocusCard = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useActionCreators as Mock).mockReturnValue({
      setidFocusCard: mockSetidFocusCard,
    });
  });

  it('должен вернуть две функции', () => {
    const { result } = renderHook(() => useHoverCard('123', true));
    expect(typeof result.current.handleMouseEnter).toBe('function');
    expect(typeof result.current.handleMouseLeave).toBe('function');
  });

  it('должен вызывать setidFocusCard с offerId при наведении', () => {
    const { result } = renderHook(() => useHoverCard('123', true));

    result.current.handleMouseEnter();

    expect(mockSetidFocusCard).toHaveBeenCalledTimes(1);
    expect(mockSetidFocusCard).toHaveBeenCalledWith('123');
  });

  it('должен вызывать setidFocusCard(null) при уходе курсора', () => {
    const { result } = renderHook(() => useHoverCard('123', true));

    result.current.handleMouseLeave();

    expect(mockSetidFocusCard).toHaveBeenCalledTimes(1);
    expect(mockSetidFocusCard).toHaveBeenCalledWith(null);
  });

  it('не должен вызывать setidFocusCard, если isSupportsHover = false', () => {
    const { result } = renderHook(() => useHoverCard('123', false));

    result.current.handleMouseEnter();
    result.current.handleMouseLeave();

    expect(mockSetidFocusCard).not.toHaveBeenCalled();
  });
});
