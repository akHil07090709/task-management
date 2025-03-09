import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import useTaskStore from "../store/taskStore";
import useUserStore from "../store/userStore";
import SelectField from "../components/common/SelectField";
import InputField from "../components/common/InputField";
import Column from "../components/planner/Column";

const Planner = () => {
  const { user } = useUserStore();
  const { tasks, fetchTasks, addTask, updateTask, deleteTask } = useTaskStore();
  console.log("tasks", tasks);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "Low",
    status: "To Do",
  });

  useEffect(() => {
    fetchTasks(user.uid);
  }, [fetchTasks]);

  const handleAddTask = async () => {
    if (!newTask.title) return;
    await addTask({ ...newTask, createdBy: user.uid });
    setShowModal(false);
    setNewTask({
      title: "",
      description: "",
      dueDate: "",
      priority: "Low",
      status: "To Do",
    });
  };

  const handleEditTask = async (id) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    setNewTask(taskToEdit);
    setShowModal(true);
  };

  const handleUpdateTask = async () => {
    await updateTask(newTask.id, newTask);
    setShowModal(false);
  };

  const handleDeleteTask = async (id) => {
    await deleteTask(id);
  };

  const handleDropTask = async (index, newStatus) => {
    const taskToUpdate = tasks[index];
    console.log("taskToUpdate", index, taskToUpdate, newStatus);

    await updateTask(taskToUpdate?.id, { ...taskToUpdate, status: newStatus });
  };

  const filteredTasks = tasks
    .filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((task) =>
      filterPriority ? task.priority === filterPriority : true
    )
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder = { High: 1, Medium: 2, Low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === "dueDate") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <div className="flex gap-4 mb-4">
          <div className="w-3/5">
            <InputField
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-1/5">
            <SelectField
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              options={[
                { value: "", label: "Sort By" },
                { value: "priority", label: "Priority" },
                { value: "dueDate", label: "Due Date" },
              ]}
            />
          </div>
          <div className="w-1/5">
            <SelectField
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              options={[
                { value: "", label: "Filter by Priority" },
                { value: "High", label: "High" },
                { value: "Medium", label: "Medium" },
                { value: "Low", label: "Low" },
              ]}
            />
          </div>
        </div>
        <div className="flex gap-4">
          {["To Do", "In Progress", "Done"].map((status) => (
            <Column
              key={status}
              status={status}
              tasks={filteredTasks.filter((task) => task.status === status)}
              onDropTask={handleDropTask}
              setShowModal={setShowModal}
              editTask={handleEditTask}
              deleteTask={handleDeleteTask}
            />
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
              <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
              <InputField
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
              />
              <InputField
                type="text"
                placeholder="Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
              />
              <InputField
                type="date"
                value={newTask.dueDate}
                onChange={(e) =>
                  setNewTask({ ...newTask, dueDate: e.target.value })
                }
              />
              <SelectField
                value={newTask.priority}
                onChange={(e) =>
                  setNewTask({ ...newTask, priority: e.target.value })
                }
                options={[
                  { value: "Low", label: "Low" },
                  { value: "Medium", label: "Medium" },
                  { value: "High", label: "High" },
                ]}
              />
              <button
                onClick={newTask.id ? handleUpdateTask : handleAddTask}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                {newTask.id ? "Update" : "Add"}
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Planner;
