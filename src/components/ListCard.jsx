import React, { forwardRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListCard = forwardRef(({ list, tasks, showNewTaskModal, onEditTask, onDeleteTask }, ref) => {
    return (
        <div
            ref={ref}
            id={`list-${tasks[0]?.listId}`}
            className="bg-white min-w-[300px] h-full max-h-[93%] rounded-lg shadow-lg border-[1px] border-gray-300 flex flex-col justify-between"
        >
            <div>
                <h3 className="text-center font-semibold tracking-wide border-b-[1px] border-black py-2">
                    {list.name}
                </h3>
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index} className="px-2 py-1 flex justify-between">
                            <span>{task.title}</span>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => onEditTask(task)}
                                    className="text-blue-500 hover:text-blue-700"
                                    aria-label="Edit Task"
                                >
                                    <FontAwesomeIcon icon={faEdit} />
                                </button>
                                <button
                                    onClick={() => onDeleteTask(task)}
                                    className="text-red-500 hover:text-red-700"
                                    aria-label="Delete Task"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full flex justify-center py-2">
                <button 
                    onClick={() => { showNewTaskModal(true, list.id) }}
                    className="bg-[#E38E49] text-white font-semibold w-50 px-3 py-1 rounded-md">
                    Add New Task
                </button>
            </div>
        </div>
    );
});

export default ListCard;
