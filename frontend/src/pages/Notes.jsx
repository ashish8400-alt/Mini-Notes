import { useEffect, useState } from "react";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../api/noteApi";

import "./Notes.css";

function Notes() {
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");

  // Notes load karna
  const loadNotes = async () => {
    try {
      const response = await getNotes();

      setNotes(response.data.notes);

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  // Note create karna
  const handleCreateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await createNote({
        title,
        content,
      });

      setMessage(response.data.message);

      setTitle("");
      setContent("");

      loadNotes();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Note delete karna
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);

      loadNotes();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="notes-page">

      <nav className="notes-navbar">
        <h2>📝 Mini Notes</h2>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </nav>

      <div className="notes-container">

        <h1>My Notes</h1>

        <form
          className="note-form"
          onSubmit={handleCreateNote}
        >
          <input
            type="text"
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit">
            + Add Note
          </button>
        </form>

        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        <div className="notes-list">

          {notes.map((note) => (
            <div className="note-item" key={note._id}>

              <h3>{note.title}</h3>

              <p>{note.content}</p>

              <button
                onClick={() => handleDelete(note._id)}
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default Notes;