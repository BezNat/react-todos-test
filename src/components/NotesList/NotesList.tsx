import React from 'react';
import styles from './NotesList.module.css'
import { NotesForm } from '../NotesForm/NotesForm';
import type { Note } from '../../types/note';

interface PropTypes {
    notes : Note[],
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>
}

const NotesList: React.FC<PropTypes> = ({notes, setNotes}) => {
    return (
        <ul className={styles.notesList}>
            {notes.map((note) => (
                <NotesForm 
                    text={note.text}
                    completed={note.completed}
                    key={note.id}
                    onDelete={() => {
                        setNotes(notes.filter((currentNote => currentNote.id != note.id)));
                    }}
                    onChangeCompleted={() => {
                        setNotes(notes.map((currentNote => currentNote.id === note.id ? { ...currentNote, completed: !currentNote.completed } : currentNote)));
                    }}
                    /> 
            ))
            }
        </ul>
    );
};

export default NotesList;