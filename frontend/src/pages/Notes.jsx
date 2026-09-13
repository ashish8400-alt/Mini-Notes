import { useEffect, useState } from "react";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../api/noteApi";

import "./Notes.css";

function Notes() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [message, setMessage] = useState("");

  // Edit ke liye
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

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

  // Edit button
  const handleEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  // Note update karna
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await updateNote(editingId, {
        title: editTitle,
        content: editContent,
      });

      setMessage(response.data.message);

      // Edit mode band
      setEditingId(null);
      setEditTitle("");
      setEditContent("");

      // Updated notes load
      loadNotes();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Edit cancel
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditContent("");
  };

  // Note delete karna
  const handleDelete = async (id) => {
    try {
      const response = await deleteNote(id);

      setMessage(response.data.message);

      loadNotes();

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  // Search ke according notes filter karna
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase()) ||
    note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="notes-page">

      {/* Navbar */}
      <nav className="notes-navbar">

        <h2>📝 Mini Notes</h2>

        <div className="user-section">

          <span>
            Hello, {user?.name} 👋
          </span>

          <button onClick={handleLogout}>
            Logout
          </button>

        </div>

      </nav>

      <div className="notes-container">

        <h1>My Notes</h1>

        {/* Search */}
        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search your notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Create Note Form */}
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

        {/* Success Message */}
        {message && (
          <p className="success-message">
            {message}
          </p>
        )}

        {/* Notes */}
        <div className="notes-list">

          {filteredNotes.length > 0 ? (

            filteredNotes.map((note) => (

              <div
                className="note-item"
                key={note._id}
              >

                {editingId === note._id ? (

                  // EDIT MODE
                  <form onSubmit={handleUpdate}>

                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(e.target.value)
                      }
                    />

                    <textarea
                      value={editContent}
                      onChange={(e) =>
                        setEditContent(e.target.value)
                      }
                    />

                    <button type="submit">
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>

                  </form>

                ) : (

                  // NORMAL MODE
                  <>

                    <h3>{note.title}</h3>

                    <p>{note.content}</p>

                    <button
                      onClick={() => handleEdit(note)}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(note._id)
                      }
                    >
                      Delete
                    </button>

                  </>

                )}

              </div>

            ))

          ) : (

            <p className="no-notes">
              {search
                ? "No notes found 🔍"
                : "No notes yet. Create your first note ✨"}
            </p>

          )}

        </div>

      </div>

    </div>
  );
}

export default Notes;