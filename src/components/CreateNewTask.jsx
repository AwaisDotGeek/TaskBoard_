import { useEffect, useState } from "react";

const CreateNewTask = ({ taskToEdit, isModalVisible, onSubmit, onClose }) => {
    const [taskDescription, setTaskDescription] = useState('');
    const [showError, setShowError] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        if (value.length <= 50) {
            setShowError(false);
            setTaskDescription(value);
        }
    };

    const handleSubmit = () => {
        const trimmedDescription = taskDescription.trim();
        if (trimmedDescription) {
            onSubmit(trimmedDescription);
            setTaskDescription(""); 
            onClose();
        } else {
            setShowError(true);
        }
    };

    useEffect(() => {
        if (taskToEdit) {
            setTaskDescription(taskToEdit.title);
            setIsEditing(true);
        } else {
            setTaskDescription('');
            setIsEditing(false);
        }
    }, [taskToEdit]);

    return (
        <div
            onClick={onClose}
            className={`${
                isModalVisible ? "fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center" : "hidden"
            }`}
        >
            <div className="bg-white rounded-lg shadow-md w-96 p-6" onClick={(e) => e.stopPropagation()}>
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                    aria-label="Close"
                >
                    ×
                </button>

                <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Task' : 'Create New Task'}</h2>

                <input
                    type="text"
                    value={taskDescription}
                    onChange={handleInputChange}
                    placeholder="Enter task description"
                    maxLength={50}
                    className={`${
                        showError ? "border-[1.5px] border-red-500" : ""
                    } w-full border rounded-md p-2 outline-none`}
                />

                <p className="text-sm text-gray-500 mt-1">
                    {50 - taskDescription.length} characters remaining
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

export default CreateNewTask;
