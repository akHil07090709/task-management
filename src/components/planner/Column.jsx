import React from "react";
import PropTypes from "prop-types";
import { useDrop } from "react-dnd";
import { ItemType } from "../../constants/UIConstants";
import Task from "./Task"; 

const Column = ({
    setShowModal,
    status,
    tasks,
    onDropTask,
    editTask,
    deleteTask,
}) => {
    const [, drop] = useDrop(() => ({
        accept: ItemType,
        drop: (item) => onDropTask(item.index, status),
    }));

    return (
        <div ref={drop} className="w-1/3 p-4 bg-gray-100 rounded-md flex flex-col">
            <h2 className="text-lg font-semibold mb-4">{status}</h2>
            <div className="flex-grow">
                {tasks.map((task, index) => (
                    <Task
                        key={task.id}
                        task={task}
                        index={index}
                        editTask={editTask}
                        deleteTask={deleteTask}
                    />
                ))}
            </div>
            {status === "To Do" && (
                <button
                    onClick={() => setShowModal(true)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                    Add Task
                </button>
            )}
        </div>
    );
};

Column.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    status: PropTypes.string.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string,
        })
    ).isRequired,
    onDropTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
};

export default Column;
