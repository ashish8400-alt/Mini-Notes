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
  const [messageType, setMessageType] = useState("");

  // Edit ke liye
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  // Delete confirmation ke liye
  const [deleteId, setDeleteId] = useState(null);


  // Message show karna
  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);

    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };


  // Notes load karna
  const loadNotes = async () => {

    try {

      const response = await getNotes();

      setNotes(response.data.notes);

    } catch (error) {

      showMessage(
        error.response?.data?.message ||
        "Failed to load notes",
        "error"
      );

    }

  };


  useEffect(() => {
    loadNotes();
  }, []);


  // Note create karna
  const handleCreateNote = async (e) => {

    e.preventDefault();

    // Validation
    if (!title.trim() || !content.trim()) {

      showMessage(
        "Please enter title and content",
        "error"
      );

      return;
    }

    try {

      const response = await createNote({
        title: title.trim(),
        content: content.trim(),
      });

      showMessage(
        response.data.message,
        "success"
      );

      setTitle("");
      setContent("");

      loadNotes();

    } catch (error) {

      showMessage(
        error.response?.data?.message ||
        "Something went wrong",
        "error"
      );

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

    // Validation
    if (!editTitle.trim() || !editContent.trim()) {

      showMessage(
        "Please enter title and content",
        "error"
      );

      return;
    }

    try {

      const response = await updateNote(
        editingId,
        {
          title: editTitle.trim(),
          content: editContent.trim(),
        }
      );

      showMessage(
        response.data.message,
        "success"
      );

      // Edit mode band
      setEditingId(null);

      setEditTitle("");

      setEditContent("");

      // Updated notes load
      loadNotes();

    } catch (error) {

      showMessage(
        error.response?.data?.message ||
        "Something went wrong",
        "error"
      );

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

      showMessage(
        response.data.message,
        "success"
      );

      loadNotes();

    } catch (error) {

      showMessage(
        error.response?.data?.message ||
        "Something went wrong",
        "error"
      );

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

    note.title
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    note.content
      .toLowerCase()
      .includes(search.toLowerCase())

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


        {/* Notes Stats */}

        <div className="notes-stats">

          <div className="stat-card">

            <h3>
              {notes.length}
            </h3>

            <p>
              Total Notes
            </p>

          </div>

        </div>


        {/* Search */}

        <input
          className="search-input"
          type="text"
          placeholder="🔍 Search your notes..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Write your note..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <button type="submit">
            + Add Note
          </button>

        </form>


        {/* Message */}

        {message && (

          <p className={`message ${messageType}`}>

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

                  /* EDIT MODE */

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

                  /* NORMAL MODE */

                  <>

                    <h3>
                      {note.title}
                    </h3>

                    <p>
                      {note.content}
                    </p>


                    {/* Created Date */}

                    <p className="note-date">

                      Created:{" "}

                      {new Date(
                        note.createdAt
                      ).toLocaleString()}

                    </p>


                    <button
                      onClick={() =>
                        handleEdit(note)
                      }
                    >
                      Edit
                    </button>


                    <button
                      onClick={() =>
                        setDeleteId(note._id)
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


      {/* ================= DELETE CONFIRMATION ================= */}

      {deleteId && (

        <div className="delete-overlay">

          <div className="delete-modal">

            <h2>
              Delete Note?
            </h2>

            <p>
              Are you sure you want to delete this note?
            </p>


            <div className="delete-actions">

              <button
                onClick={() =>
                  setDeleteId(null)
                }
              >
                Cancel
              </button>


              <button
                onClick={() => {

                  handleDelete(deleteId);

                  setDeleteId(null);

                }}
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}

export default Notes;