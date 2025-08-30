import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Footer } from './Footer';

describe('Footer', () => {
  const mockSetFilter = jest.fn();
  const mockOnDeleteCompletedNotes = jest.fn();

  beforeEach(() => {
    mockSetFilter.mockClear();
    mockOnDeleteCompletedNotes.mockClear();
  });

  test('отображается правильное количество заметок', () => {
    render(
      <Footer
        notesCount={3}
        filter="all"
        hasCompletedNotes={false}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );


    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('items left')).toBeInTheDocument();
  });

  test('отображается правильная форма для одной заметки', () => {
    render(
      <Footer
        notesCount={1}
        filter="all"
        hasCompletedNotes={false}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('item left')).toBeInTheDocument();
  });

  test('отображаются все кнопки фильтров', () => {
    render(
      <Footer
        notesCount={2}
        filter="all"
        hasCompletedNotes={false}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  test('вызывает setFilter при клике на фильтр All', async () => {
    const user = userEvent.setup();
    render(
      <Footer
        notesCount={2}
        filter="active"
        hasCompletedNotes={false}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    const allButton = screen.getByText('All');
    await user.click(allButton);

    expect(mockSetFilter).toHaveBeenCalledWith('all');
  });

  test('вызывает setFilter при клике на фильтр Active', async () => {
    const user = userEvent.setup();
    render(
      <Footer
        notesCount={2}
        filter="all"
        hasCompletedNotes={false}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    const activeButton = screen.getByText('Active');
    await user.click(activeButton);

    expect(mockSetFilter).toHaveBeenCalledWith('active');
  });

  test('вызывает setFilter при клике на фильтр Completed', async () => {
    const user = userEvent.setup();
    render(
      <Footer
        notesCount={2}
        filter="all"
        hasCompletedNotes={false}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    const completedButton = screen.getByText('Completed');
    await user.click(completedButton);

    expect(mockSetFilter).toHaveBeenCalledWith('completed');
  });

  test('отображает кнопку Clear completed', () => {
    render(
      <Footer
        notesCount={2}
        filter="all"
        hasCompletedNotes={true}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    expect(screen.getByText('Clear completed')).toBeInTheDocument();
  });

  test('кнопка Clear completed активна когда есть завершенные заметки', () => {
    render(
      <Footer
        notesCount={2}
        filter="all"
        hasCompletedNotes={true}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    const clearButton = screen.getByText('Clear completed');
    expect(clearButton).not.toBeDisabled();
  });

  test('кнопка Clear completed неактивна когда нет завершенных заметок', () => {
    render(
      <Footer
        notesCount={2}
        filter="all"
        hasCompletedNotes={false}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    const clearButton = screen.getByText('Clear completed');
    expect(clearButton).toBeDisabled();
  });

  test('вызывает onDeleteCompletedNotes при клике на Clear completed', async () => {
    const user = userEvent.setup();
    render(
      <Footer
        notesCount={2}
        filter="all"
        hasCompletedNotes={true}
        setFilter={mockSetFilter}
        onDeleteCompletedNotes={mockOnDeleteCompletedNotes}
      />
    );

    const clearButton = screen.getByText('Clear completed');
    await user.click(clearButton);

    expect(mockOnDeleteCompletedNotes).toHaveBeenCalled();
  });
});