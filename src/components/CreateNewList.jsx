import { useState, useEffect } from "react";

const CreateNewList = ({ listToEdit, isModalVisible, onSubmit, onClose }) => {
    const [listTitle, setListTitle] = useState("");
    const [showError, setShowError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setShowError(false);
            setListTitle(value);
        }
    };

    const handleSubmit = () => {
        const trimmedTitle = listTitle.trim();
        if (trimmedTitle) {
            onSubmit(trimmedTitle);
            setListTitle('');
            onClose();
        } else {
            setShowError(true);
        }
    };

    useEffect(() => {
        if (listToEdit) {
            setListTitle(listToEdit.name);
            setIsEditing(true);
        } else {
            setListTitle('');
            setIsEditing(false);
        }
    }, [listToEdit]);

    return (
        <div
            onClick={onClose}
            className={`${isModalVisible ? 'fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center' : 'hidden'}`}
        >
            <div className="bg-white rounded-lg shadow-md w-96 p-6" onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit List' : 'Create New List'}</h2>

                <input
                    type="text"
                    value={listTitle}
                    onChange={handleInputChange}
                    placeholder="Enter list title"
                    maxLength={50}
                    className={`${showError ? 'border-[1.5px] border-red-500' : ''} w-full border rounded-md p-2 focus:outline-none`}
                />

                <p className="text-sm text-gray-500 mt-1">
                    {50 - listTitle.length} characters remaining
                </p>

                <div className="flex justify-end mt-4 space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-black font-semibold"
                    >
                        Close
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold"
                    >
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateNewList;
