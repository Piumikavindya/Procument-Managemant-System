import { render, screen } from '@testing-library/react';
import Hm from './pages/Hm';

test('renders learn react link', () => {
  render(<Hm />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
