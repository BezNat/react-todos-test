import React, { useEffect } from 'react';
import { Input } from '../Input/Input';
import styles from './ContentBox.module.css'
import { useState } from 'react';
import type { Note } from '../../types/note';
import NotesList from '../NotesList/NotesList';
import { Footer } from '../Footer/Footer';
import type { Filter } from '../../types/Filter';


const LOCAL_STORAGE_KEY = 'notes';

export const ContentBox: React.FC = () => {

    const [notes, setNotes] = useState<Note[]>(() => {
      const saveNotes = localStorage.getItem(LOCAL_STORAGE_KEY)
      return saveNotes ? JSON.parse(saveNotes) : [];
    });
    const [inpuText, setInputText] = useState<string>('');
    const [filter, setFilter] = useState<Filter>('all');

    const onAddNotes: (note:Note) => void = (note) => {
      setNotes([...notes, note])
    }

    const onDeleteCompletedNotes: () => void = () => {
      setNotes(notes.filter(note => {return !note.completed}))
    }

    useEffect(() => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes))
    }, [notes]);

    const filteredNotes: Note[] = notes.filter(note => {
      if (filter === 'active') return !note.completed
      if (filter === 'completed') return note.completed
      return true
    })

    return (
        <form className={styles.contentBox}>
          <Input inpuText={inpuText} setInputText={setInputText} onAddNotes={onAddNotes}/>
          <NotesList notes={filteredNotes} setNotes={setNotes}/>
          <Footer notesCount={notes.reduce((sum, current) => current.completed? sum : sum+1, 0)} 
              filter={filter}
              hasCompletedNotes={notes.find(note => note.completed === true) ? true: false} 
              setFilter={setFilter} onDeleteCompletedNotes={onDeleteCompletedNotes}/>
        </form>
    );
};