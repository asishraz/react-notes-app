import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import { api } from './api.js';
import { AxiosError } from 'axios';
import axios from 'axios';


type Note = {
  id: number;
  title: string;
  content: string;
};

const App = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const fetchNotes = async () => {
    try {
        console.log('Fetching notes...');
        const response = await api.get('notes/');
        console.log('Fetched notes:', response.data);
        setNotes(response.data);
    } catch (error) {
        console.error('Error fetching notes:', error);
    }
};

  const handleAddNote = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    const newNote: Omit<Note, 'id'> = {
      title: title,
      content: content,
    };

    console.log("request payload: ", newNote);
    

    try {
      const response = await api.post('notes/', newNote);
      setNotes((prevNotes) => [response.data, ...prevNotes]);
      // setNotes([response.data, ...notes]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error('Error adding note:', error);
    }
  }, [title, content, notes]);

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedNote) {
      return;
    }

    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };

    try {
      const response = await api.put(`notes/${selectedNote.id}/`, updatedNote);
      setNotes(notes.map((note) => (note.id === selectedNote.id ? response.data : note)));
      setTitle("");
      setContent("");
      setSelectedNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  }, [title, content, selectedNote, notes]);

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = async (event: React.MouseEvent, note:Note) => {
    event.stopPropagation();

    try {
      await api.delete(`notes/${note.id}/`);
      setNotes(notes.filter((n) => n.id !== note.id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  useEffect(() => {
    console.log('Component mounted');
    return () => {
        console.log('Component unmounted');
    };
}, []); // Empty dependency array to run only once on mount

  return (
    <div className="app-container">
      <form
        className="note-form"
        // onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
        onSubmit={(event: React.FormEvent<HTMLFormElement>) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}

      >
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
        <input
          id = "title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Content"
          rows={10}
          required
        />
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div className="note-item" key={note.id} onClick={() => handleNoteClick(note)}>
            <div className="notes-header">
              <button onClick={(event) => deleteNote(event, note)}>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
