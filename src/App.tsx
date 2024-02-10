import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import api from './api';


type Note = {
  id: number;
  title: string;
  content: string;
}

api.get('/some-endpoint')
  .then(response => {
    // Handle the response
  })
  .catch(error => {
    // Handle errors
  });

const App = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  useEffect(() => {
    // Make an API request to fetch notes
    api.get('/notes')
      .then(response => {
        // Handle the response
        setNotes(response.data);
      })
      .catch(error => {
        // Handle errors
        console.error('Error fetching notes:', error);
      });
  }, []);
    // {
    //   id: 1,
    //   title: "test note 1",
    //   content: "bla bla note1",
    // },
    // {
    //   id: 2,
    //   title: "test note 2 ",
    //   content: "bla bla note2",
    // },
    // {
    //   id: 3,
    //   title: "test note 3",
    //   content: "bla bla note3",
    // },
    // {
    //   id: 4,
    //   title: "test note 4 ",
    //   content: "bla bla note4",
    // },
    // {
    //   id: 5,
    //   title: "test note 5",
    //   content: "bla bla note5",
    // },
    // {
    //   id: 6,
    //   title: "test note 6",
    //   content: "bla bla note6",
    // },
    // ]);

    const handleAddNote = useCallback((event: React.FormEvent) => {
      event.preventDefault();
      // console.log("title: ", title);
      // console.log("content: ", content);

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    };

    

    setNotes([newNote, ...notes]);
    setTitle("");
    setContent("");
  }, [title, content, notes]);

  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
  
    if (!selectedNote) {
      return;
    }
  
    const updatedNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
    };
  
    const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));
  
    setNotes(updatedNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };
  const handleCancel = () => {
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const deleteNote = (event: React.MouseEvent, noteId: number) => {
    event.stopPropagation();
  
    const updatedNotes = notes.filter((note) => note.id !== noteId);
  
    setNotes(updatedNotes);
  };


  return (
    <div className="app-container">
      <form
      className="note-form"
      onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
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
        value = {title}
        onChange={(event) => setTitle(event.target.value)} 
        placeholder="Title" 
        required />
        <textarea 
        value={content}
        onChange={(event) => setContent(event.target.value)}        
        placeholder="Content" 
        rows={10} 
        required />

        {/* <button type="submit">Add Note</button> */}
      </form>

      <div className="notes-grid">

        {notes.map((note) => (
        <div className="note-item" key={note.id} onClick={() => handleNoteClick(note)}>
          <div className="notes-header">
          <button onClick={(event) => deleteNote(event, note.id)}>x</button>
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