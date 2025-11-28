import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuTrash2 } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { PRIORITY_DATA } from "../../utils/data";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import moment from "moment";
import SelectUsers from "../../components/Inputs/SelectUsers";
import TodoListInput from "../../components/Inputs/TodoListInput";
import AddAttatchmentInput from "../../components/Inputs/AddAttatchmentInput";
import Modal from "../../components/Modal";
import DeleteAlert from "../../components/DeleteAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
    assignedTo: [],
    todoCheckList: [],
    attatchments: [], // 🔥 backend spelling
  });

  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      assignedTo: [],
      todoCheckList: [],
      attatchments: [], // 🔥 backend spelling
    });
  };

  // ------------------------------------------------
  // CREATE TASK
  // ------------------------------------------------
  const createTask = async () => {
    setLoading(true);
    try {
      const todoList = taskData.todoCheckList.map((item) => ({
        text: item,
        completed: false,
      }));

      await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        attatchments: taskData.attatchments, // 🔥 correct
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });

      toast.success("Task created successfully.");
      clearData();
    } catch (error) {
      console.error("Error creating task", error);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // UPDATE TASK
  // ------------------------------------------------
  const updateTask = async () => {
    setLoading(true);
    try {
      const prevChecklist = currentTask?.todoCheckList || [];

      const todoList = taskData.todoCheckList.map((item) => {
        const prev = prevChecklist.find((t) => t.text === item);
        return {
          text: item,
          completed: prev?.completed || false,
        };
      });

      await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        attatchments: taskData.attatchments, // 🔥 correct
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoCheckList: todoList,
      });

      toast.success("Task updated successfully.");
    } catch (error) {
      console.error("Error updating task", error);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------------------------------
  // VALIDATION & SUBMIT
  // ------------------------------------------------
  const handleSubmit = () => {
    setError("");

    if (!taskData.title.trim()) return setError("Please enter task title.");
    if (!taskData.description.trim())
      return setError("Please enter task description.");
    if (!taskData.dueDate) return setError("Please select due date.");
    if (taskData.assignedTo.length === 0)
      return setError("Please select at least one user.");
    if (taskData.todoCheckList.length === 0)
      return setError("Please add at least one todo.");

    if (taskId) updateTask();
    else createTask();
  };

  // ------------------------------------------------
  // FETCH TASK BY ID
  // ------------------------------------------------
  const getTaskDetailsById = async (taskId) => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (response.data) {
        const taskInfo = response.data;
        setCurrentTask(taskInfo);

        setTaskData({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : "",
          assignedTo: taskInfo.assignedTo?.map((u) => u._id) || [],
          todoCheckList: taskInfo.todoCheckList?.map((t) => t.text) || [],
          attatchments: taskInfo.attatchments || [], // 🔥 correct spelling
        });
      }
    } catch (error) {
      console.error("Error fetching task by id", error);
    }
  };

  const deleteTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));
    setOpenDeleteAlert(false);
    toast.success("Task deleted successfully.");
    navigate("/admin/tasks");
    } catch (error) {
      console.error("Error deleting task", error?.response?.data?.message || error.message);
      
    }
  }

  useEffect(() => {
    if (taskId) getTaskDetailsById(taskId);
  }, [taskId]);
  return (
    <DashboardLayout activeMenu={"Create Task"}>
      <div className="mt-5 px-3 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="form-card col-span-3 p-4 md:p-6">
            {/* HEADER */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-2xl font-semibold">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-sm font-medium text-rose-500 bg-rose-50 px-2 py-1 rounded border border-rose-100"
                  onClick={() => setOpenDeleteAlert(true)}
                >
                  <LuTrash2 className="text-base" />
                  Delete
                </button>
              )}
            </div>

            {/* TITLE */}
            <div className="mt-5">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>
              <input
                className="form-input mt-1"
                value={taskData.title}
                onChange={(e) => handleValueChange("title", e.target.value)}
                placeholder="Enter task title"
              />
            </div>

            {/* DESCRIPTION */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Description
              </label>
              <textarea
                rows={4}
                className="form-input mt-1"
                value={taskData.description}
                onChange={(e) =>
                  handleValueChange("description", e.target.value)
                }
                placeholder="Describe the task in detail"
              />
            </div>

            {/* PRIORITY – DATE – ASSIGN */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(option) =>
                    handleValueChange("priority", option.value)
                  }
                  placeholder="Select Priority"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-input mt-1"
                  value={taskData.dueDate}
                  onChange={(e) => handleValueChange("dueDate", e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>
                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(val) =>
                    handleValueChange("assignedTo", val)
                  }
                />
              </div>
            </div>

            {/* TODO LIST */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                ToDo Checklist
              </label>
              <TodoListInput
                todoList={taskData.todoCheckList}
                setTodoList={(val) => handleValueChange("todoCheckList", val)}
              />
            </div>

            {/* ATTACHMENTS */}
            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>
              <AddAttatchmentInput
                attatchments={taskData.attatchments}
                setAttatchments={(val) =>
                  handleValueChange("attatchments", val)
                }
              />
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-xs font-semibold text-red-500 mt-4">{error}</p>
            )}

            {/* SUBMIT */}
            <div className="flex justify-end mt-6">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* DELETE MODAL */}
      <Modal
        isOpen={openDeleteAlert}
        onClose={() => setOpenDeleteAlert(false)}
        title="Delete Task"
      >
        <DeleteAlert
          content="Are you sure you want to delete this task?"
          onDelete={() => deleteTask()}
        />
      </Modal>
    </DashboardLayout>
  );

};

export default CreateTask;
