import { render, screen } from '@testing-library/react';
import type { Note } from '../../types/note';
import NotesList from './NotesList';


describe('NotesList', () => {
  const mockSetNotes = jest.fn();
  const mockNotes: Note[] = [
    { id: '1', text: 'Test note 1', completed: false },
    { id: '2', text: 'Test note 2', completed: true }
  ];

  beforeEach(() => {
    mockSetNotes.mockClear();
  });

  test('рендерит HTML-элемент списка', () => {
    render(<NotesList notes={mockNotes} setNotes={mockSetNotes} />);
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  test('отображается 2 заметки', () => {
    render(<NotesList notes={mockNotes} setNotes={mockSetNotes} />);
    expect(screen.getAllByText(/Test note/)).toHaveLength(2);
  });

  test('когда передан пустой массив, то отображается пустой список', () => {
    render(<NotesList notes={[]} setNotes={mockSetNotes} />);
    const list = screen.getByRole('list');
    expect(list).toBeEmptyDOMElement();
  });
});