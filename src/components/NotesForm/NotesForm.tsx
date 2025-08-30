import React from 'react';
import styles from './NotesForm.module.css'

interface PropsNotesForm {
  text : string, 
  completed : boolean, 
  onDelete: () => void,
  onChangeCompleted: () => void
}

export const NotesForm: React.FC<PropsNotesForm> = ({text, completed, onDelete, onChangeCompleted}) => {

    return (

        <li className={styles.noteItem} >
            <div className= {`${styles.noteCheckbox} ${completed ? styles.checked : ''}`} onClick={onChangeCompleted}></div>
            <span className={`${styles.noteText} ${completed ? styles.completed : ''}`} onClick={onChangeCompleted}>{text}</span>
            
            <button className={styles.deleteBtn} onClick={onDelete} title='delete'>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                </svg>
            </button>
        </li>

    );
};

