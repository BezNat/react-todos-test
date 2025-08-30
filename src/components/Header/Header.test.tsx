import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  test('Отрисовка с заголовком todos в Header', () => {
    render(<Header />);
    expect(screen.getByText('todos')).toBeInTheDocument();
  });
});