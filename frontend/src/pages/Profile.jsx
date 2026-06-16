import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

function Profile() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [stats, setStats] = useState({
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0
  });

  useEffect(() => {

    const fetchStats = async () => {

      try {

        const token =
          localStorage.getItem(
            "token"
          );

        const res =
          await API.get(
            "/dashboard/stats",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setStats(
          res.data
        );

      } catch (error) {

        console.log(error);

      }

    };

    fetchStats();

  }, []);

  return (

    <div className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-8">

        <h1 className="text-4xl font-bold text-indigo-600 mb-8">
          👤 My Profile
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-slate-50 p-5 rounded-lg">

            <h3 className="font-semibold text-gray-600">
              Name
            </h3>

            <p className="text-xl mt-2">
              {user?.name}
            </p>

          </div>

          <div className="bg-slate-50 p-5 rounded-lg">

            <h3 className="font-semibold text-gray-600">
              Email
            </h3>

            <p className="text-xl mt-2">
              {user?.email}
            </p>

          </div>

          <div className="bg-slate-50 p-5 rounded-lg">

            <h3 className="font-semibold text-gray-600">
              Role
            </h3>

            <p className="text-xl mt-2 capitalize">
              {user?.role}
            </p>

          </div>

        </div>

        <h2 className="text-2xl font-bold mt-10 mb-6">
          📊 Task Statistics
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-blue-100 p-6 rounded-lg text-center">

            <h3 className="font-semibold">
              Total Tasks
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.total_tasks}
            </p>

          </div>

          <div className="bg-green-100 p-6 rounded-lg text-center">

            <h3 className="font-semibold">
              Completed
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.completed_tasks}
            </p>

          </div>

          <div className="bg-yellow-100 p-6 rounded-lg text-center">

            <h3 className="font-semibold">
              Pending
            </h3>

            <p className="text-4xl font-bold mt-2">
              {stats.pending_tasks}
            </p>

          </div>

        </div>

        <div className="mt-10">

          <Link
            to="/dashboard"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            ← Back To Dashboard
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Profile;