import { useDrag } from "react-dnd";
import { ItemType } from "../../constants/UIConstants";

const Task = ({ task, index, editTask, deleteTask }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { index, status: task.status },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 bg-white shadow-md rounded-md cursor-pointer mb-2 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{task.title}</span>
        <span
          className={`px-2 py-1 text-white text-sm rounded ${
            task.priority === "High"
              ? "bg-red-500"
              : task.priority === "Medium"
              ? "bg-yellow-500"
              : "bg-green-500"
          }`}
        >
          {task.priority}
        </span>
      </div>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <p className="text-gray-500 text-xs mt-1">Due: {task.dueDate}</p>
      <div className="flex gap-4 mt-2">
        <button
          onClick={() => editTask(task.id)}
          className="cursor-pointer px-2 py-1 bg-yellow-500 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="cursor-pointer px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
