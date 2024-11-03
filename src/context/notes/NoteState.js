import React, { useState } from "react";
import Alert from "../../components/Alert";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:3004";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const note = await response.json();
      setNotes(notes.concat(note));
      showAlert("Note added successfully", "success");
    } catch (error) {
      console.error("Error adding note:", error.message);
      showAlert("Failed to add note", "danger");
    }
  };

  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      setNotes(json);
      showAlert("Notes fetched successfully", "success");
    } catch (error) {
      console.error("Error fetching notes:", error.message);
      showAlert("Failed to fetch notes", "danger");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newNotes = notes.filter((note) => note._id !== id);
      setNotes(newNotes);
      showAlert("Note deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting note:", error.message);
      showAlert("Failed to delete note", "danger");
    }
  };

  // Edit a note
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token'),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Update the note locally
      const updatedNotes = notes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      );
      setNotes(updatedNotes);
      showAlert("Note updated successfully", "success");
    } catch (error) {
      console.error("Error editing note:", error.message);
      showAlert("Failed to edit note", "danger");
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes, showAlert }}>
      <Alert message={alert?.message} type={alert?.type} />
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
