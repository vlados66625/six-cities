import { render, act } from '@testing-library/react';
import { MemoryHistory, createMemoryHistory } from 'history';
import ScrollToTop from './scroll-to-top';
import { withRouter } from '../../test-utils/mock-component';
import { Route, Routes } from 'react-router-dom';

describe('Component: ScrollToTop', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
    vi.spyOn(window, 'scrollTo').mockImplementation(() => { });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('должен вызвать метод window.scrollTo(0,0) при смене роута', () => {
    const componentWithRouter = withRouter(
      <>
        <ScrollToTop />
        <Routes>
          <Route path='/'>
            <Route index element={<div>Page 1</div>} />
            <Route path='page1' element={<div>Page 2</div>} />
            <Route path='page2' element={<div>Page 3</div>} />
          </Route>
        </Routes>
      </>,
      mockHistory
    );

    render(componentWithRouter);

    act(() => mockHistory.push('/page1'));
    act(() => mockHistory.push('/page2'));
    act(() => mockHistory.push('/'));

    expect(window.scrollTo).toHaveBeenLastCalledWith(0, 0);
    expect(window.scrollTo).toHaveBeenCalledTimes(4);
  });
});
