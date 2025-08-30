import { fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';


describe('Input', () => {
  const mockSetInputText = jest.fn();
  const mockOnAddNotes = jest.fn();

  beforeEach(() => {
    mockSetInputText.mockClear();
    mockOnAddNotes.mockClear();
  });

  test('отрисовка input с placeholder: What needs to be done?', () => {
    render(
      <Input 
        inpuText="" 
        setInputText={mockSetInputText} 
        onAddNotes={mockOnAddNotes} 
      />
    );
    const input = screen.getByPlaceholderText('What needs to be done?');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('');
  });

  test('отрисовка кнопки', () => {
    render(
      <Input 
        inpuText="" 
        setInputText={mockSetInputText} 
        onAddNotes={mockOnAddNotes} 
      />
    );
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('при вводе текста пользователем вызывается setInputText ', async () => {
    render(
      <Input 
        inpuText="" 
        setInputText={mockSetInputText} 
        onAddNotes={mockOnAddNotes} 
      />
    );
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    fireEvent.change(input, { target: { value: 'Test note' } });
  
    expect(mockSetInputText).toHaveBeenCalledWith('Test note');
  });


  test('пустые заметки не добавляются', async () => {
    const user = userEvent.setup();
    
    render(
      <Input 
        inpuText="" 
        setInputText={mockSetInputText} 
        onAddNotes={mockOnAddNotes} 
      />
    );
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    await user.type(input, '{Enter}');
    
    expect(mockOnAddNotes).not.toHaveBeenCalled();
    expect(mockSetInputText).not.toHaveBeenCalled();
  });

  test('проверяет отображение текущего значения input', () => {
    const testValue = 'Current input text';
    
    render(
      <Input 
        inpuText={testValue} 
        setInputText={mockSetInputText} 
        onAddNotes={mockOnAddNotes} 
      />
    );
    
    const input = screen.getByPlaceholderText('What needs to be done?');
    expect(input).toHaveValue(testValue);
  });
});