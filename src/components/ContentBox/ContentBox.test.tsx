import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContentBox } from './ContentBox';

describe('ContentBox', () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value.toString();
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
  })();

  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  beforeEach(() => {
    localStorage.clear();
  });

  test('рендерит основные компоненты', () => {
    render(<ContentBox />);
    
    // Проверяем наличие основных элементов
    expect(screen.getByPlaceholderText('What needs to be done?')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
    expect(screen.getByText('Clear completed')).toBeInTheDocument();
  });

  test('загружает заметки из localStorage при монтировании', () => {
    const savedNotes = JSON.stringify([
      { id: '1', text: 'Saved note', completed: false }
    ]);
    localStorage.setItem('notes', savedNotes);
    
    render(<ContentBox />);
    
    expect(screen.getByText('Saved note')).toBeInTheDocument();
  });

  test('сохраняет заметки в localStorage при изменении', async () => {
    const user = userEvent.setup();
    render(<ContentBox />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    await user.type(input, 'Test note{enter}');
    
    const savedNotes = localStorage.getItem('notes');
    expect(savedNotes).toContain('Test note');
  });

  test('добавляет новую заметку через Enter', async () => {
    const user = userEvent.setup();
    render(<ContentBox />);
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    
    await user.type(input, 'New test note{enter}');
    
    expect(screen.getByText('New test note')).toBeInTheDocument();
    expect(input).toHaveValue(''); // Input должен очиститься
  });


});