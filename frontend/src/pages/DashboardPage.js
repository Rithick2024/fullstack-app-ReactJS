import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import AddNoteModal from "../components/AddNoteModal";
import EditNoteModal from "../components/EditNoteModal";
import toast from "react-hot-toast";

const DashboardPage = () => {
    const [isOpenAdd, setIsOpenAdd] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [notes, setNotes] = useState([]);
    const [noteToEdit, setNoteToEdit] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [noteToDelete, setNoteToDelete] = useState(null);

    const toggleAddModal = () => setIsOpenAdd(!isOpenAdd);
    const toggleEditModal = () => setIsOpenEdit(!isOpenEdit);
    const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const fetchNotes = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user?.user_id) return;

        const res = await fetch(`http://127.0.0.1:8000/notes?user_id=${user.user_id}`);
        const data = await res.json();
        setNotes(data);
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const user = JSON.parse(localStorage.getItem("user")) || { user_name: "User" };

    const rightButtons = (
        <div className="flex items-center gap-4 relative">
            <button
                onClick={toggleAddModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-sm"
            >
                <i className="fas fa-plus" />
                Add Note
            </button>

            <button
                onClick={toggleUserMenu}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
            >
                <i className="fas fa-user-circle text-blue-600" />
                {(user?.user_name || "User").split(" ")[0]}
            </button>

            {showUserMenu && (
                <div className="absolute top-12 right-0 mt-2 w-36 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded shadow-md z-10">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 rounded-lg text-blue-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 text-sm"
                    >
                        <i className="fas fa-sign-out-alt" />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );

    const handleEdit = (note) => {
        setNoteToEdit(note);
        toggleEditModal();
    };

    const handleDelete = (note) => {
        setNoteToDelete(note);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/notes/${noteToDelete.note_id}`, {
                method: "DELETE",
                headers: { "accept": "application/json" },
            });

            if (res.ok) {
                toast.success("Note deleted successfully");
                setNotes(notes.filter((note) => note.note_id !== noteToDelete.note_id));
                setShowDeleteConfirm(false);
            } else {
                toast.error("Failed to delete the note.");
            }
        } catch (error) {
            toast.error("An error occurred while deleting.");
        }
    };

    return (
        <div className="min-h-screen">
            <Header rightButton={rightButtons} />

            <main className="p-6">
                <h2 className="text-xl text-blue-500 font-semibold mb-4">Your Notes</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {notes.map((note) => (
                        <div
                            key={note.note_id}
                            className="relative border p-4 rounded shadow-lg dark:bg-gray-800 dark:border-gray-700"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-lg">{note.note_title}</h3>
                                <div className="flex gap-4 text-gray-600">
                                    <button
                                        className="text-sm text-blue-600"
                                        onClick={() => handleEdit(note)}
                                    >
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button
                                        className="text-sm text-red-600"
                                        onClick={() => handleDelete(note)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="border-b-2 mb-2"></div>
                            <div
                                className="text-sm text-gray-600 dark:text-gray-300"
                                dangerouslySetInnerHTML={{ __html: note.note_content }}
                            ></div>
                        </div>
                    ))}
                </div>
            </main>

            {isOpenAdd && (
                <AddNoteModal
                    onClose={toggleAddModal}
                    onNoteSaved={fetchNotes}
                />
            )}

            {isOpenEdit && (
                <EditNoteModal
                    onClose={toggleEditModal}
                    onNoteSaved={fetchNotes}
                    noteToEdit={noteToEdit}
                />
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded shadow w-96">
                        <h3 className="text-lg font-semibold">Are you sure you want to delete this note?</h3>
                        <div className="mt-4 flex justify-end gap-4">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 rounded bg-gray-500 text-white"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-4 py-2 rounded bg-red-500 text-white"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
