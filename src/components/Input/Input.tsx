import styles from './Input.module.css'
import type { Note } from '../../types/note';

interface PropTypes {
    inpuText : string,
    setInputText : React.Dispatch<React.SetStateAction<string>>,
    onAddNotes: (note:Note) => void
}

export const Input: React.FC<PropTypes>=  ({inpuText, setInputText, onAddNotes}) => {

    const onSubmit: (event: any) => void = (event) => {
        event.preventDefault()
        if (inpuText.trim() !== '') {
            const note: Note = {id: Math.random().toString(), text: inpuText, completed: false}
            onAddNotes(note)
            setInputText('')
        }
    }
    const handleKeyPress: (event: any) => void = (event) => {
        if(event.key === 'Enter'){
                onSubmit(event)
        }
    };
    return (
        <div className={styles.inputSection}>
            <button 
                type="button"
                className={styles.toggleAll}
                onClick={onSubmit}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            <input
                type="text"
                value={inpuText}
                onChange={(event) => {
                    setInputText(event.target.value);
                }}
                onKeyPress={handleKeyPress}
                placeholder="What needs to be done?"
                className={styles.inputField}
            />
        </div>
    );
};
