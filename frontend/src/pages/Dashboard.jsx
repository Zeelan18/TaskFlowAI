import { useEffect, useState } from "react";
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const user = JSON.parse(
  localStorage.getItem("user")
);
  const [darkMode, setDarkMode] = useState(false);

  const [stats, setStats] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0
  });

  const [tasks, setTasks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "",
    deadline: ""
  });
  const [editingTask, setEditingTask] = useState(null);

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token");

      const statsRes = await API.get(
        "/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setStats(statsRes.data);

      const tasksRes = await API.get(
        "/tasks/all",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTasks(tasksRes.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchDashboardData();

  }, []);

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleCreateTask = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      await API.post(
        "/tasks/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Task Created Successfully");

      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        category: "",
        deadline: ""
      });

      fetchDashboardData();

    } catch (error) {

      console.log(error);

      alert("Failed To Create Task");

    }
  };

  const handleCompleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.put(
        `/tasks/complete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchDashboardData();

    } catch (error) {

      console.log(error);

      alert("Failed To Complete Task");

    }
  };

  const handleDeleteTask = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await API.delete(
        `/tasks/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchDashboardData();

    } catch (error) {

      console.log(error);

      alert("Failed To Delete Task");

    }
  };
  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      deadline: task.deadline
    });
  };
  const handleUpdateTask = async (e) => {

  e.preventDefault();

  try {

    const token = localStorage.getItem("token");

    await API.put(
      `/tasks/update/${editingTask.id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    alert("Task Updated Successfully");

    setEditingTask(null);

    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      category: "",
      deadline: ""
    });

    fetchDashboardData();

  } catch (error) {

    console.log(error);

    alert("Failed To Update Task");

  }

};
const generateAITasks = async () => {

  try {

    const response = await API.post(
      "/ai/generate-tasks",
      {
        title: formData.title
      }
    );

    setFormData({
      ...formData,
      description:
        response.data.tasks
    });

  } catch (error) {

    console.log(error);

    alert(
      "Failed To Generate AI Tasks"
    );

  }

};
  const handleLogout = () => {

  localStorage.removeItem(
    "token"
  );

  localStorage.removeItem(
    "user"
  );

  window.location.href = "/";

};
  const chartData = [
  {
    name: "Completed",
    value: stats.completed_tasks
  },
  {
    name: "Pending",
    value: stats.pending_tasks
  }
];

const COLORS = [
  "#22c55e",
  "#f59e0b"
];

  const filteredTasks = tasks.filter((task) => {

    const matchesSearch =
      task.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "All"
        ? true
        : task.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );

  });

  return (

    <div
      className={
        darkMode
          ? "min-h-screen bg-slate-900 text-white p-6"
          : "min-h-screen bg-slate-100 p-6"

      }
    >

      <div className="bg-white shadow-lg rounded-xl p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-indigo-600">
            🚀 TaskFlow AI
          </h1>
          <p className="text-gray-500">
            Smart Task Management Dashboard
          </p>
        </div>
        <button
  onClick={() =>
    setDarkMode(!darkMode)
  }
  className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg mr-3"
>
  {
    darkMode
      ? "☀ Light"
      : "🌙 Dark"
  }
</button>
        <button
  onClick={() =>
    window.location.href =
      "/profile"
  }
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg mr-3"
>
  👤 Profile
</button>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          logout
        </button>
    </div>


      <hr />

      <h2 className="text-2xl font-bold mb-4">
        Welcome, {user?.name}
      </h2>
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

  <h2 className="text-xl font-bold mb-3">
    📈 Task Progress
  </h2>

  <div className="w-full bg-gray-200 rounded-full h-6">

    <div
      className="bg-green-500 h-6 rounded-full text-white text-center"
      style={{
        width: `${
          stats.total_tasks === 0
            ? 0
            : (
                stats.completed_tasks /
                stats.total_tasks
              ) * 100
        }%`
      }}
    >
      {
        stats.total_tasks === 0
          ? "0%"
          : `${Math.round(
              (
                stats.completed_tasks /
                stats.total_tasks
              ) * 100
            )}%`
      }
    </div>

  </div>

</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <div className="bg-blue-100 p-6 rounded-xl shadow-md">
             <h3 className="text-xl font-semibold">Total Tasks</h3>
             <p className="text-4xl font-bold mt-2">
                {stats.total_tasks}
             </p>
        </div>
        <div className="bg-green-100 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Completed</h3>
            <p className="text-4xl font-bold mt-2">
                {stats.completed_tasks}
            </p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
            <h3 className="text-xl font-semibold">Pending</h3>
            <p className="text-4xl font-bold mt-2">
                 {stats.pending_tasks}
            </p>
        </div>
      </div>

      <hr />

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-6">
          ➕ Create New Task
        </h2>
        <form
           onSubmit={
            editingTask
              ? handleUpdateTask
              : handleCreateTask
           }
           className="space-y-4"

           
        >

        <input
          type="text"
          name="title"
          className="w-full border border-gray-300 rounded-lg p-3"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <br /><br />
        <button
  type="button"
  onClick={generateAITasks}
  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg mb-3"
>
  ✨ Generate AI Tasks
</button>

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"
          required
        />

        <br /><br />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"

        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"

        />

        <br /><br />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-3"

          required
        />

        <br /><br />

        <button 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
        >
          {
            editingTask
              ? "Update Task"
              : "Create Task"
          }

          
        
        </button>
        {
  editingTask && (

    <button
      type="button"
      onClick={() => {

        setEditingTask(null);

        setFormData({
          title: "",
          description: "",
          priority: "Medium",
          category: "",
          deadline: ""
        });

      }}
      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg ml-3"
    >
      Cancel
    </button>

  )
}

      </form>
      </div>
      <hr />

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">
          🔍 Search & Filter
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by Title"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-lg p-3"
          />
          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border border-gray-300 rounded-lg p-3"
          >
            <option value="All">
              All Tasks
            </option>

            <option value="Pending">
             Pending
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>
        </div>
      </div>

      <hr />
      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">

  <h2 className="text-2xl font-bold mb-6">
    📊 Task Analytics
  </h2>

  <div className="h-80">

    <ResponsiveContainer
      width="100%"
      height="100%"
    >

      <PieChart>

        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >

          {
            chartData.map(
              (entry, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index %
                      COLORS.length
                    ]
                  }
                />
              )
            )
          }

        </Pie>

        <Tooltip />

        <Legend />

      </PieChart>

    </ResponsiveContainer>

  </div>

</div>

      <h2 className="text-3xl font-bold mb-6">
        📋 My Tasks
      </h2>

      {
        filteredTasks.length === 0 ? (
          <p>No Tasks Found</p>
        ) : (
          filteredTasks.map((task) => (

            <div
              key={task.id}
              className="bg-white shadow-lg rounded-xl p-6 mb-4 hover:shadow-xl transition"
           >

              <h3 className="text-xl font-bold text-indigo-600 mb-3">
                {task.title}
              </h3>

              <p className="text-gray-700 mb-2">
                <strong>Description:</strong>{" "}
                {task.description}
              </p>

              <p className="mb-2">
                <strong>Priority:</strong>{" "}
                <span
                  className={
                    task.priority === "High"
                    ? "bg-red-500 text-white px-2 py-1 rounded text-sm"
                    : task.priority === "Medium"
                    ? "bg-yellow-500 text-black px-2 py-1 rounded text-sm"
                    : "bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  }
                >
                  {task.priority}

                </span>
              </p>



              <p className="mb-2">
                <strong>Status:</strong>{" "}
                <span
                  className={
                    task.status === "Completed"
                    ? "bg-green-500 text-white px-2 py-1 rounded text-sm"
                    : "bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                  }
                >
                  {task.status}


                </span>
              </p>

              <p className="mb-2">
                <strong>Category:</strong>{" "}
                {task.category}

              </p>

              {
  (() => {

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    if (task.deadline < today) {

      return (
        <span className="bg-red-500 text-white px-3 py-1 rounded text-sm mr-4">
          🔴 Overdue
        </span>
      );

    }

    if (task.deadline === today) {

      return (
        <span className="bg-yellow-500 text-white px-3 py-1 rounded text-sm mr-4">
          🟡 Due Today
        </span>
      );

    }

    return (
      <span className="bg-green-500 text-white px-3 py-1 rounded text-sm mr-4">
        🟢 Upcoming
      </span>
    );

  })()
}

              
          
                          







              <button
                onClick={() =>
                    handleCompleteTask(task.id)
                }
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Mark Complete
              </button>

              <button
                onClick={() =>
                  handleEditTask(task)
                
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-3"
              >
                Edit

              </button>
              
              

              <button
                onClick={() =>
                    handleDeleteTask(task.id)
                }
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg ml-3"
              >
                Delete
              </button>

            </div>

          ))
        )
      }

    </div>

  );
}


export default Dashboard;  
                                                                                                                   
