import api from "./axios";

export const getNotes = () => {
  const token = localStorage.getItem("token");

  return api.get("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createNote = (noteData) => {
  const token = localStorage.getItem("token");

  return api.post("/notes", noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateNote = (id, noteData) => {
  const token = localStorage.getItem("token");

  return api.put(`/notes/${id}`, noteData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteNote = (id) => {
  const token = localStorage.getItem("token");

  return api.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};