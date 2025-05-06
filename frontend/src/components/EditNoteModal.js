import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditNoteModal = ({ onClose, onNoteSaved, noteToEdit }) => {
  const [title, setTitle] = useState(noteToEdit.note_title);
  const [content, setContent] = useState(noteToEdit.note_content);
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!title || !content) {
      setError("Both title and content are required.");
      return;
    }
    
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.user_id) return alert("User not found");

    const res = await fetch(`http://127.0.0.1:8000/notes/${noteToEdit.note_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        note_title: title,
        note_content: content,
        user_id: user.user_id,
      }),
    });

    if (res.ok) {
      onNoteSaved();
      onClose();
    } else {
      alert("Failed to save note.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Note</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-black dark:hover:text-white text-xl">&times;</button>
        </div>
        
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          className="w-full p-3 mb-4 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
        />
        
        <ReactQuill
          value={content}
          onChange={setContent}
          placeholder="Note Content"
          className="mb-4"
        />

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-500 text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditNoteModal;
